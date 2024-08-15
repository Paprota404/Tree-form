using Microsoft.EntityFrameWorkCore;
using TreeNode.Models;

namespace TreeDbContext;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<TreeNode> TreeNodes { get; set; }
}