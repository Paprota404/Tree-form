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
        if (newNode == null)
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
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

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

    

    [HttpPost("SortNodes")]
    public async Task<IActionResult> SortNodes()
    {
       
        var nodes = await _context.TreeNodes.ToListAsync();

        var nodeDict = nodes.ToDictionary(n => n.Id);

        var sortedRootNodes = new List<TreeNode>();

        var rootNodes = nodes.Where(n => n.ParentId == null).OrderBy(n => n.Name).ToList();

        foreach (var rootNode in rootNodes)
        {
            SortNodeRecursively(rootNode, nodeDict, sortedRootNodes);
        }

        for (int i = 0; i < sortedRootNodes.Count; i++)
        {
            sortedRootNodes[i].Order = i;
        }

        _context.TreeNodes.UpdateRange(sortedRootNodes);
        await _context.SaveChangesAsync();

        return Ok();
    }

    private void SortNodeRecursively(TreeNode node, Dictionary<int, TreeNode> nodeDict, List<TreeNode> sortedNodes)
    {
        sortedNodes.Add(node);

        var children = nodeDict.Values.Where(n => n.ParentId == node.Id).OrderBy(n => n.Name).ToList();

        foreach (var child in children)
        {
            SortNodeRecursively(child, nodeDict, sortedNodes);
        }
    }
}
