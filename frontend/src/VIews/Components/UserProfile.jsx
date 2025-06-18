import { Link,Outlet, useNavigate, useLocation } from 'react-router-dom'
import "../../Styles/UserProfile.scss"

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = () => {
        if(!window.confirm('Are you sure you want to log out?')) 
            return;
        
        sessionStorage.removeItem('_user_data');
        navigate('/');
    }

  return (
    <div id='user_dashboard'>
        <aside>
            <ul>
                <li><Link to='/user/profile' className={ location.pathname === '/user/profile' ? 'active' : '' }>User Profile</Link></li>
                <li><Link to='/user/profile/all-posts' className={ location.pathname === '/user/profile/all-posts' ? 'active' : '' }>All Posts</Link></li>
                <li><Link to='/user/profile/all-comments' className={ location.pathname === '/user/profile/all-comments' ? 'active' : '' }>All Comments</Link></li>
                <li onClick={handleLogOut}>LogOut</li>
            </ul>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default UserProfile