namespace backend.DTO;

public class CreateCommentDto
{
    public int PostId { get; set; }
    public int UserId { get; set; }
    public int CommentId { get; set; }
    public string? Comment { get; set; }
}