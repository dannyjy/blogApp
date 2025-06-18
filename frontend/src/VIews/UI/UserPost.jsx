import Profile from './Profile'
import '../../Styles/userposts.scss'
import { useNavigate } from 'react-router-dom'

const UserPost = ({id,userName,catogory,title,context,image}) => {

  const navigate = useNavigate();

  return (
    <div className='user-post'>
        <Profile profileName={userName} profileCategory={catogory}/>
        <div className='post-content'>
            <h2>{title}</h2>
            <p>{context}</p>
            <div className='user' style={{ backgroundImage: `url(${image})` }} />
        </div>
        <div className='reactions'>
            {/* <button>Like</button> */}
            <button onClick={() => navigate(`/comment/${id}`)}>Comment</button>
        </div>
    </div>
  )
}

export default UserPost