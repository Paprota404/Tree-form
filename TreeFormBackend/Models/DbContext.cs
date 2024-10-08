using Microsoft.EntityFrameworkCore;
using TreeNodes.Models;

namespace TreeDbContext;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<TreeNode> TreeNodes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TreeNode>()
            .HasMany(n => n.Children)
            .WithOne()
            .HasForeignKey(n => n.ParentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TreeNode>().HasData(
new TreeNode { Id = 1, Name = "Root", ParentId = null, Order = 0 },
new TreeNode { Id = 2, Name = "Child 1", ParentId = 1, Order = 0 },
new TreeNode { Id = 3, Name = "Child 2", ParentId = 1, Order = 1 }
);
    }
}