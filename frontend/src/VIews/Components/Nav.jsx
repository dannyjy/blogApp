import '../../Styles/Nav.scss'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user,setUser] = useState(false);

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

  return (
    <nav>
      <div className="container">
        <h1 onClick={() => {navigate('/')}} className="logo">Tech<span>Chat</span></h1>
        <ul>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
        </ul>
      </div>
      {
        location.pathname === '/user' ? (
          <div className='user-menu'>
            <section  onClick={handleMenuToggle}>
              <div className='user' style={{ backgroundImage: 'url("/images/csparp.jpg")' }}
              ></div>
              <h4>John Doe</h4>
            </section>
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
            <button><Link to="/login">Login</Link></button>
            <button><Link to="/signup">SignUp</Link></button>
          </div>
        )
      }
    </nav>
  )
}

export default Nav