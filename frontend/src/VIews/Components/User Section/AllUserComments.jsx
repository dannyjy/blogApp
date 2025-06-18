import { useEffect, useState } from 'react'
import Axios from 'axios'
import '../../../Styles/userposts.scss'

const AllUserComments = () => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [user, setUser] = useState({
    authorized: false,
    data: { id: "", firstName: "", lastName: "", email: "" },
  });

    useEffect(() => {
    let storedData = sessionStorage.getItem("_user_data");

    if (storedData == null) {
      storedData = {};
    } else {
      storedData = JSON.parse(storedData);
    }

    setUser(storedData);
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5009/comments/user/${user.data.id}`)
      .then(response => setComments(response.data))
      .catch(error => {
        setComments([]);
        console.log(error);
      });
  }, [user]);


    // Delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    Axios.delete(`http://localhost:5009/comment/${id}`)
      .then(() => {
        setComments(comments.filter(c => c.id !== id));
      })
      .catch( () => alert("Failed to delete comment"));
  };

  // Edit handler
  const handleEdit = (id, currentValue) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const handleEditSave = (id) => {
    Axios.put(`http://localhost:5009/comment/${id}`, { comment: editValue })
      .then(() => {
        setComments(comments.map(c => c.id === id ? { ...c, comment: editValue } : c));
        setEditingId(null);
        setEditValue("");
      })
      .catch( () => alert("Failed to update comment"));
  };

  return (
    <div style={{ paddingLeft: "1rem" }}>
      {comments.length === 0 ? (
        <p style={{ textAlign: "center", padding: "1rem",background: "#d3d3d3",borderRadius: "1rem" }}>No comments found.</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <CommentPost
                comment={comment.comment}
                userName={user.data.firstName + " " + user.data.lastName}
                date={comment.createdAt.slice(0, 10)}
                onDelete={() => handleDelete(comment.id)}
                onEdit={() => handleEdit(comment.id, comment.comment)}
                isEditing={editingId === comment.id}
                editValue={editValue}
                setEditValue={setEditValue}
                onEditSave={() => handleEditSave(comment.id)}
                onCancelEdit={() => { setEditingId(null); setEditValue(""); }}
              />
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllUserComments

function CommentPost({ userName, date, comment, onDelete, onEdit, isEditing, editValue, setEditValue, onEditSave, onCancelEdit }) {
  return (
    <div className='comment' style={{border: "1px solid #ccc", borderRadius: "16px", padding: "1rem", marginBottom: "1rem"}}>
      <div className="profile" style={{ backgroundImage: 'url("/images/profile1.jpg")' }}/>
      <div className="comment-body">
        <div className="comment-header">
          <h4>{userName}</h4>
          {isEditing ? (
            <textarea
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              style={{ width: "100%", minHeight: "60px" }}
            />
          ) : (
            <p>{comment}</p>
          )}
        </div>
        <div className="comment-footer">
          <p className='date'><strong>Created:</strong> {date}</p>
          <section className="comment-actions">
            {isEditing ? (
              <>
                <button onClick={onEditSave}>Save</button>
                <button onClick={onCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onEdit}>Edit</button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}