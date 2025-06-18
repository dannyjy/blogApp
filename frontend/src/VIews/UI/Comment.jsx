import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Comment() {

    const location = useLocation();
    const [profile, setProfile] = useState({
        authorized: false,
        data: { id: "", firstName: "", lastName: "", email: "" }
    })

    useEffect(() => {
        const userData = sessionStorage.getItem("_user_data");

        if (userData !== null) {
            const data = JSON.parse(userData);
            setProfile(data)
        } else {
            setProfile({authorized: false, data: { id: "", firstName: "", lastName: "", email: "" }})
        }
    }, [location])

    const tmp = location.pathname.split("/")
    const id = tmp[tmp.length - 1];

    const navigate = useNavigate()
    const [post, setPost] = useState();
    const [comments, setComments] = useState([])

    useEffect(() => {
        Axios({
            method: "GET",
            url: `http://localhost:5009/post/${id}`
        }).then((response) => {
            setPost(response.data)
        })

        Axios({
            method: "GET",
            url: `http://localhost:5009/comments/post/${id}`
        }).then((response) => {
            // 
            setComments(response.data)
        })
    }, [id])

    const handleComment = (e) => {
        e.preventDefault();
        if (!profile.authorized) {
            if (window.confirm("You will have to login first to write a blog")) {
                navigate('/login');
            }
            return;
        }

        const comment = e.target.comment.value;
        const user = profile.data.id;
        const postId = id;

        Axios({
            method: "POST",
            url: `http://localhost:5009/comment?UserId=${user}&PostId=${postId}`,
            data: {
                comment: comment,
                user: user,
                post: postId
            }
        }).then((response) => {
            alert("Comment Posted Successfully")
            document.getElementById("comment").value = "";

            // Add the new comment to the state without refreshing
            setComments(prev => [
                ...prev,
                {
                    id: response.data.id || Math.random(), // Use backend id if available
                    userName: profile.data.firstName + " " + profile.data.lastName,
                    createdAt: new Date().toISOString(),
                    comment: comment
                }
            ]);

        }).catch((error) => {
            alert(error)
        })
    }


    return (
        <div id="comment-page">
            <div className="comment-page-header">
                <button className='backBtn' onClick={() => navigate("/")}>
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    Back
                </button>
                <h1>{post && post.title}</h1>
                <p>{post && post.description}</p>
                <div className="comment-post" style={{
                    backgroundImage: `url(${post && post.image})`
                }}></div>
            </div>
            <div className="comment-page-body">
                <h1>Comments ({comments.length})</h1>
                <div className="comment-grid">
                    {
                        comments.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "1rem" }}>No comments found for this post</p>
                        ) : (
                            comments.map((data, key) => (
                                <CommentPost userName={data.userName.toUpperCase()} date={data.createdAt.slice(0, 10)} comment={data.comment} key={key} />
                            ))
                        )
                    }
                </div>
                <form onSubmit={handleComment} className="comment-form">
                    <input type="text" placeholder='Comment here' name='comment' id='comment' />
                    <button type='submit'>Comment</button>
                </form>
            </div>
        </div>
    )
}

function CommentPost({ userName, date, comment }) {
    return (
        <div className='comment'>
            <div className="profile" style={{ backgroundImage: 'url("/images/profile1.jpg")' }}/>
            <div className="comment-body">
                <div className="comment-header">
                    <h4>{userName}</h4>
                    <p>{comment}</p>
                </div>
                <p className='date'><strong>Created:</strong> {date}</p>
            </div>
        </div>
    )
}