using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }

        public DbSet<Posts> Posts { get; set; }

        public DbSet<Comments> Comments { get; set; }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}