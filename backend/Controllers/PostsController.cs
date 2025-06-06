using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            user.Posts.Add(post.Id);
            _context.Posts.Add(post);

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(CreatePost), new { id = post.Id }, post);
        }
        
        // Get all posts
        [HttpGet("post")]
        public async Task<IActionResult> GetPosts()
        {
            if (await _context.Posts.CountAsync() == 0)
            {
                return NotFound("No posts found");
            }

            return Ok(await _context.Posts.ToListAsync());
        }


        // Get all posts for a specific user
        [HttpGet("posts")]
        public async Task<IActionResult> GetPosts(UserIdDTO users)
        {
            var user = await _context.Users.FindAsync(users.Id);
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

        // [HttpGet("posts/{id}")]
        // public async Task<IActionResult> GetPost(UserIdDTO user)
        // {
        //     var post = await _context.Posts.FindAsync(user.Id);
        //     if (post == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(post);
        // }

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

            _context.Posts.Update(post);
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
        public async Task<IActionResult> SearchPosts(SearchPostsDTO seacrh)
        {
            var posts = await _context.Posts
                .Where(p =>
                    !string.IsNullOrEmpty(seacrh.query) &&
                    (
                        (p.Title != null && p.Title.Contains(seacrh.query)) ||
                        (p.Category != null && p.Category.Contains(seacrh.query)) ||
                        (p.Description != null && p.Description.Contains(seacrh.query))
                    )
                )
                .ToListAsync();

                return Ok(posts);
        }
    }
}