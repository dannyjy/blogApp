import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Axios from "axios"
import { useLocation } from "react-router-dom"
import "../../Styles/main.scss"
import UserPost from '../UI/UserPost';

const Section = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('Home');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const search = params.get('search');
      if (search) {
        setIsSearching(true);
        setTitle(`Search Results for "${search}"`);
        Axios.get(`http://localhost:5009/post/search?query=${search}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          setIsSearching(false);
          setTitle('Home');
          setPosts([]);
          console.log(error);
        });
      } else {
        setIsSearching(false);
        setTitle('Home');
      }
    }, [location.search]);
  return (
    <div className="section">
        <h1><Link to="/">{title}</Link></h1>
        <div className="section-content">
          {
            isSearching ? (
                posts.map((post, index) => {
                  return (
                    <UserPost key={index} id={post.id} userName={post.user.firstName + " " + post.user.lastName} title={post.title} catogory={post.category} context={post.description} image={post.image}/>
                  )
                })
            ) : (
              <Outlet />
            )
          }
        </div>
    </div>
  )
}

export default Section