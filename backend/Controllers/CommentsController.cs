using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.DTO;


namespace backend.Controllers
{
    [ApiController]
    [Route("")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("comment")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Comment))
            {
                return BadRequest("Comment data is required.");
            }

            var user = await _context.Users.FindAsync(dto.UserId);
            var post = await _context.Posts.FindAsync(dto.PostId);
            if (user == null || post == null)
            {
                return NotFound("User most login first before login");
            }

            if (post.Comments == null)
                post.Comments = new List<int>();
            if (user.Comments == null)
                user.Comments = new List<int>();

            var comment = new Comments
            {
                Comment = dto.Comment
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            dto.CommentId = new Random().Next(100, 9999);
            post.Comments.Add(comment.Id);
            user.Comments.Add(comment.Id);
            _context.Posts.Update(post);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateComment), new { id = comment.Id }, comment);
        }

        [HttpGet("comments")]
        public async Task<IActionResult> GetComments()
        {
            if (await _context.Comments.CountAsync() == 0)
            {
                return NotFound("No comments found");
            }

            return Ok(await _context.Comments.ToListAsync());
        }

        [HttpGet("comments/user/{id}")]
        public async Task<IActionResult> GetCommentsByUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var comments = user.Comments;

            if (comments == null || comments.Count == 0)
            {
                return NotFound("You don't have any comments yet");
            }

            var commentsList = await _context.Comments.Where(c => comments.Contains(c.Id)).ToListAsync();

            if (commentsList == null || commentsList.Count() == 0)
            {
                return NotFound("You don't have any comments yet");
            }

            return Ok(commentsList);
        }

        [HttpGet("comments/post/{id}")]
        public async Task<IActionResult> GetCommentsByPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found");
            }

            var comments = post.Comments;

            if (comments == null || comments.Count == 0)
            {
                return NotFound("No comments found for this post");
            }

            var commentsList = await _context.Comments.Where(c => comments.Contains(c.Id)).ToListAsync();
            
            if (commentsList == null || commentsList.Count == 0)
            {
                return NotFound("No comments found for this post");
            }

            return Ok(commentsList);
        }


        [HttpPut("comments/{id}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] Comments comment)
        {
            if (comment == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var commentToUpdate = await _context.Comments.FindAsync(id);
            if (commentToUpdate == null)
            {
                return NotFound();
            }

            commentToUpdate.Comment = comment.Comment;
            _context.Comments.Update(commentToUpdate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("comments/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            // Remove the comment ID from all users' Comments lists
            var usersWithComment = (await _context.Users.ToListAsync())
                .Where(u => u.Comments != null && u.Comments.Contains(id))
                .ToList();
            foreach (var user in usersWithComment)
            {
                if (user.Comments != null)
                {
                    user.Comments.Remove(id);
                }
                _context.Users.Update(user); // Ensure EF tracks the change
            }

            // Remove the comment ID from all posts' Comments lists
            var postsWithComment = (await _context.Posts.ToListAsync())
                .Where(p => p.Comments != null && p.Comments.Contains(id))
                .ToList();
            foreach (var post in postsWithComment)
            {
                if (post.Comments != null)
                {
                    post.Comments.Remove(id);
                }
                _context.Posts.Update(post); // Ensure EF tracks the change
            }

            // Remove the comment itself
            _context.Comments.Remove(comment);

            await _context.SaveChangesAsync();

            return Ok("Comment deleted successfully");
        }
    }
}