using System.ComponentModel.DataAnnotations;  // For [Key] attribute
using System.ComponentModel.DataAnnotations.Schema;

namespace TreeNodes.Models;


public class TreeNode
{
    
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; } 
    public int Order { get; set; } 
    public List<TreeNode> Children { get; set; } = new List<TreeNode>();
}