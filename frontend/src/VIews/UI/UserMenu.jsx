import '../../Styles/Nav.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserMenu = () => {
    const [user,setUser] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        if(!window.confirm('Are you sure you want to log out?')) 
            return;

        localStorage.removeItem('user');
        setUser(false);
        navigate('/');
    }

  return (
    <div className='user-dropdown'>
        <ul>
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/user/settings">Settings</Link></li>
            <li onClick={handleLogOut}>Logout</li>
        </ul>
    </div>
  )
}

export default UserMenu