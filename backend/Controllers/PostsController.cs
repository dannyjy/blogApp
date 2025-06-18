using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("post")]
        public async Task<IActionResult> CreatePost(int Id,[FromBody] Posts post)
        {
            if (post == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _context.Users.FindAsync(Id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Posts == null)
            {
                user.Posts = new List<int>();
            }
            post.Id = new Random().Next(100, 9999);
            post.Users = Id;
            user.Posts.Add(post.Id);
            _context.Posts.Add(post);

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(CreatePost), new { id = post.Id }, post);
        }

        // Get all posts and the user who created them with all his/her data besides there passowrd
        [HttpGet("post")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.Posts
                .Join(
                    _context.Users,
                    post => post.Users,
                    user => user.Id,
                    (post, user) => new {
                        post.Id,
                        post.Title,
                        post.Description,
                        post.Category,
                        post.Image,
                        User = new {
                            user.Id,
                            user.FirstName,
                            user.LastName,
                            user.Email,
                            user.Image
                        }
                    }
                )
                .ToListAsync();

            return Ok(posts);
        }


        // Get all posts for a specific user and the user
        [HttpGet("posts")]
        public async Task<IActionResult> GetPosts(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            if (user.Posts == null || !user.Posts.Any())
            {
                return Ok(new List<Posts>());
            }

            var posts = await _context.Posts
                .Where(p => user.Posts.Contains(p.Id))
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("post/{Id}")]
        public async Task<IActionResult> GetPost(int Id)
        {
            var post = await _context.Posts.FindAsync(Id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPut("post/{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Posts post)
        {

            var existingPost = await _context.Posts.FindAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            existingPost.Title = post.Title;
            existingPost.Description = post.Description;
            existingPost.Category = post.Category;
            existingPost.Image = post.Image;

            // _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok("Post updated successfully");
        }

        [HttpDelete("post/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok("Post deleted successfully");
        }

        [HttpGet("post/search")]
        public async Task<IActionResult> SearchPosts(string query)
        {
            var posts = await _context.Posts
                .Where(p =>
                    !string.IsNullOrEmpty(query) &&
                    (
                        (p.Category != null && p.Category.Contains(query)) ||
                        (p.Title != null && p.Title.Contains(query))
                    // (p.Description != null && p.Description.Contains(query))
                    )
                )
                .Join(
                    _context.Users,
                    post => post.Users,
                    user => user.Id,
                    (post, user) => new {
                        post.Id,
                        post.Title,
                        post.Description,
                        post.Category,
                        post.Image,
                        User = new {
                            user.Id,
                            user.FirstName,
                            user.LastName,
                            user.Email,
                            user.Image
                        }
                    }
                )
                .ToListAsync();

            return Ok(posts);
        }
    }
}