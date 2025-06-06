using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Posts
    {
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        public string? Image { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public string? Category { get; set; }

        public List<int>? Comments { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}