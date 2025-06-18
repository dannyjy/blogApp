import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import '../../../Styles/userposts.scss'
import Profile from '../../UI/Profile'
import PostCard from '../../UI/PostCard'


const AllUserPost = () => {

  const location = useLocation();
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState({
    authorized: false,
    data: { id: "", firstName: "", lastName: "", email: "" },
  });

  useEffect(() => {
    let storedData = sessionStorage.getItem("_user_data");
    if (storedData !== null) {
      storedData = JSON.parse(storedData);
      setUser(storedData);
    }
  }, [location]);
  
  useEffect(() => {
    Axios({
        method: "GET",
        url: `http://localhost:5009/posts?Id=${user.data.id}`,
      }).then((response) => {
        setPosts(response.data);
        console.log(response.data);
      });
  },[user]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete your account?")) {
      Axios({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        url: `http://localhost:5009/post/${id}` 
      }).then((response) => {
        setPosts(posts.filter(c => c.id !== id));
        alert("Post deleted successfully!");
        console.log(response.data);
      });
    }
  };

const [editingPostId, setEditingPostId] = useState(null);

const handleSave = (id, updatedData) => {
    Axios.put(`http://localhost:5009/post/${id}`, {
          Title: updatedData.title,
          Category: updatedData.category,
          Description: updatedData.description,
          Image: updatedData.Image
        })
        .then(() => {
            alert("Post updated successfully!");
            setPosts(posts.map(post =>
              post.id === id
                  ? { ...post, ...updatedData, image: updatedData.Image } // update fields
                  : post
            ));
            setEditingPostId(null);
          });
};

const handleUpdate = (post) => {
  setEditingPostId(post.id);
};

  return (
    <div style={{ paddingLeft: "1rem" }}>
      {
        posts.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem",background: "#d3d3d3",borderRadius: "1rem" }}>No posts found</p>
        ) : (
        posts.map((post) => (
            editingPostId === post.id ? (
            <PostCard
              Close={() => setEditingPostId(null)}
              postData={post} // pass the post to edit
              onSave={handleSave}
            />
          ) : (
          <UserPost
            key={post.id}
            image={post.image}
            userName={user.data.firstName + " " + user.data.lastName}
            title={post.title}
            catogory={post.category}
            context={post.description}
            Delete={() => handleDelete(post.id)}
            Update={() => handleUpdate(post)}
          />
          ))
      ))}

    </div>
  )
}

export default AllUserPost

const UserPost = ({userName,catogory,title,context,image,Delete,Update}) => {

  return (
    <div className='user-post'>
        <Profile profileName={userName} profileCategory={catogory}/>
        <div className='post-content'>
            <h2>{title}</h2>
            <p>{context}</p>
            <div className='user' style={{ backgroundImage: `url(${image})` }} />
        </div>
        <div className='reactions'>
            <button onClick={Delete}>Delete</button>
            <button onClick={Update}>Update</button>
        </div>
    </div>
  )
}