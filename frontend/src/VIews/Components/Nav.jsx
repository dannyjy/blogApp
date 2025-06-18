import '../../Styles/Nav.scss'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Post from '../UI/PostCard';
import Axios from 'axios';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false);
  
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

  const handleMenuToggle = () => {
    navigate('/user/profile')
}

const handlePostToggle = () => {
  profile.authorized ?
    setToggle(!toggle) : 
    confirm("You will have to login first to write a blog") ?
      navigate('/login') : null ;

  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav>
      <div className="container">
        <h1 onClick={() => {navigate('/')}} className="logo">Tech<span>Chat</span></h1>
        <div className="search">
          <form className="search-input" onSubmit={handleSearch}>
            <img src="/images/search.svg" alt="" className='icon' onClick={handleSearch}/>
            <input type="text" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </form>
          <img src="/images/menu.svg" alt="" className='icon menu' onClick={handleMenuToggle}/>
        </div>
      </div>
      {
        profile.authorized ? (
          <div className='user-menu'>
            <div className='write' onClick={handlePostToggle}>
              <img src="/images/write.svg" alt="" className='icon menu'/>
              <p>Write</p>
            </div>
            {toggle &&  <Post Close={handlePostToggle}/>}
            <div className='profile'  onClick={handleMenuToggle}>
              <div className='user' style={{ backgroundImage: 'url("/images/profile1.jpg")' }}/>
              <h4>{profile.data.firstName.toUpperCase()} {profile.data.lastName.toUpperCase()}</h4>
            </div>
          </div>
        ) : (
          <div className='btns'>
            <div className='write' onClick={handlePostToggle}>
              <img src="/images/write.svg" alt="" className='icon'/>
              <p>Write</p>
            </div>
            {toggle && <Post Close={handlePostToggle}/>}
            <section>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Sign</button></Link>
            </section>
          </div>
        )
      }
    </nav>
  )
}

export default Nav