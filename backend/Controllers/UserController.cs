using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("user")]
        public async Task<IActionResult> CreateUser([FromBody] Users user)
        {
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto user)
        {
            if (user == null)
            {
                return BadRequest("User data is required");
            }

            if (id != user.Id)
            {
                return BadRequest("User ID mismatch");
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.Email = user.Email;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Update Password
        [HttpPut("user/{id}/password")]
        public async Task<IActionResult> UpdatePassword(int id, UpdatePasswordDto update)
        {
            if (string.IsNullOrEmpty(update.NewPassword))
            {
                return BadRequest("New password cannot be empty");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Password = update.NewPassword;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok($"Password updated successfully, {user})");
        }

        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully");
        }

        [HttpGet("user/search")]
        public async Task<IActionResult> SearchUsers(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Search query cannot be empty");
            }

            var users = await _context.Users
                .Where(u =>
                    (u.FirstName != null && u.FirstName.Contains(query)) ||
                    (u.LastName != null && u.LastName.Contains(query)) ||
                    (u.Email != null && u.Email.Contains(query))
                )
                .ToListAsync();

            if (users.Count == 0)
            {
                return NotFound("No users found matching the search criteria");
            }

            return Ok(users);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            if (string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Email and password are required");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(user);
        }
    }
}