using TreeDbContext;
using Microsoft.AspNetCore.Mvc;
using TreeNodes.Models;
using Microsoft.EntityFrameworkCore;

namespace Tree.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TreeNodeController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TreeNodeController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetTreeNodes")]
    public async Task<IActionResult> GetTreeNodes()
    {

        var rootNodes = await GetTreeNodesAsync(null);
        return Ok(rootNodes);
    }

    private async Task<List<TreeNode>> GetTreeNodesAsync(int? parentId)
    {

        var nodes = await _context.TreeNodes
            .Where(n => n.ParentId == parentId)
            .OrderBy(n => n.Order)
            .ToListAsync();


        foreach (var node in nodes)
        {
            node.Children = await GetTreeNodesAsync(node.Id);
        }

        return nodes;
    }

    [HttpPost("AddNode")]
    public async Task<IActionResult> AddNode([FromBody] TreeNode newNode)
    {
        if (newNode == null || newNode.ParentId == null)
            return BadRequest("Invalid node");

        
        newNode.ParentId = newNode.Id;
        newNode.Id = GenerateUniqueId();

        newNode.Children = new List<TreeNode>();
        newNode.Name = "New Node1";
        _context.TreeNodes.Add(newNode);
        await _context.SaveChangesAsync();

        return Ok(newNode);
    }

    private int GenerateUniqueId()
    {
        // Get current UTC timestamp
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        // Convert timestamp to integer (you may need to adjust this depending on your ID size requirements)
        return (int)timestamp;
    }

    [HttpPut("UpdateNode")]
    public async Task<IActionResult> UpdateNode([FromBody] TreeNode updatedNode)
    {
        var node = await _context.TreeNodes.FindAsync(updatedNode.Id);
        if (node == null)
            return NotFound("Node not found");

        node.Name = updatedNode.Name;
        await _context.SaveChangesAsync();
        return Ok(node);
    }

    [HttpDelete("DeleteNode")]
    public async Task<IActionResult> DeleteNode([FromBody] TreeNode deletedNode)
    {
        var node = await _context.TreeNodes.FindAsync(deletedNode.Id);
        if (node == null)
            return NotFound("Node not found");

        _context.TreeNodes.Remove(node);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("MoveNode/{nodeId}/to/{newParentId}")]
    public async Task<IActionResult> MoveNode(int nodeId, int newParentId)
    {
        var node = await _context.TreeNodes.FindAsync(nodeId);
        var newParent = await _context.TreeNodes.FindAsync(newParentId);

        if (node == null || newParent == null)
            return NotFound("Node or new parent not found");

        node.ParentId = newParentId;
        await _context.SaveChangesAsync();
        return Ok(node);
    }

    [HttpPost("SortNodes")]
    public async Task<IActionResult> SortNodes([FromBody] List<int> nodeIds)
    {
        var nodes = await _context.TreeNodes
            .Where(n => nodeIds.Contains(n.Id))
            .ToListAsync();

        if (nodes.Count != nodeIds.Count)
            return NotFound("Some nodes not found");

        for (int i = 0; i < nodes.Count; i++)
        {
            nodes[i].Order = i;
        }

        _context.TreeNodes.UpdateRange(nodes);
        await _context.SaveChangesAsync();
        return Ok(nodes);
    }
}
