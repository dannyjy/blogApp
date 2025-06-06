import '../../Styles/Nav.scss'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Post from '../UI/Post';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user,setUser] = useState(false);
  const [toggle,setToggle] = useState(false);

  const handleMenuToggle = () => {
    setUser(!user);
  }

  const handleLogOut = () => {
    if(!window.confirm('Are you sure you want to log out?')) {
      return;
    }
    localStorage.removeItem('user');
    setUser(false);
    navigate('/');
  }
  const handlePostToggle = () => {
    setToggle(!toggle);
  }

  return (
    <nav>
      <div className="container">
        <h1 onClick={() => {navigate('/')}} className="logo">Tech<span>Chat</span></h1>
        <div className="search">
          <img src="/images/search.svg" alt="" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      {
        location.pathname === '/user' ? (
          <div className='user-menu'>
            <div className='write' onClick={handlePostToggle}>
              <img src="/images/write.svg" alt="" className='icon'/>
              <p>Write</p>
            </div>
            {
              toggle &&  <Post Close={handlePostToggle}/>
            }
            <div className='profile'  onClick={handleMenuToggle}>
              <div className='user' style={{ backgroundImage: 'url("/images/csparp.jpg")' }}
              ></div>
              <h4>John Doe</h4>
            </div>
            {user && (
              <div className='user-dropdown'>
                <ul>
                  <li><Link to="/user/profile">Profile</Link></li>
                  <li><Link to="/user/settings">Settings</Link></li>
                  <li onClick={handleLogOut}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className='btns'>
            <div className='write' onClick={handlePostToggle}>
              <img src="/images/write.svg" alt="" className='icon'/>
              <p>Write</p>
            </div>
            {
              toggle && <Post Close={handlePostToggle}/>
            }
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