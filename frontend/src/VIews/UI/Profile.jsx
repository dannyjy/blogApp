import '../../Styles/profile.scss'

const Profile = ({profileName, profileCategory}) => {
  return (
    <div className='profile'>
        <div className='user' style={{ backgroundImage: 'url("/images/profile1.jpg")' }}/>
        <section>
            <h3>{profileName}</h3>
            <p>{profileCategory}</p>
        </section>
    </div>
  )
}

export default Profile