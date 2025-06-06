using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        public List<int>? Posts { get; set; }
        public List<int>? Comments { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}