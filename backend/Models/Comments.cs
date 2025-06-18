using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Comments
    {
        public int Id { get; set; }

        [Required]
        public string? Comment { get; set; }

        public int User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}