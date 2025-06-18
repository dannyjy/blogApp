import UserPost from '../UI/UserPost';
import "../../Styles/userposts.scss"
import Axios from 'axios';
import { useEffect, useState } from 'react';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () =>{
        Axios.get("http://localhost:5009/post")
        .then((response) => {
            setPosts(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='all-posts'>
        {
            posts.map((post, index) =>{
                return (
                <UserPost key={index} id={post.id} userName={post.user.firstName + " " + post.user.lastName} title={post.title} catogory={post.category} context={post.description} image={post.image}/>
                )
        })
        }
    </div>
  )
}

export default AllPosts