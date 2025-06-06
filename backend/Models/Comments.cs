using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Comments
    {
        public int Id { get; set; }

        [Required]
        public string? Comment { get; set; }
    }

}