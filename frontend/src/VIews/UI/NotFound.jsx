import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' , backgroundColor: '#000000', height: '100vh', color: '#fff' }}>
        <div className="not-found" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' , fontSize: "1.8rem" }}>Oops!</h2>
            <h1 style={{ marginBottom: '20px', color: '#808080',fontSize: "3rem" }}>404 - Page Not Found</h1>
            <p style={{fontSize: "2rem" }}>Sorry, the page you are looking for does not exist.</p>
            <p style={{fontSize: "2rem" }}>You can go back to the <Link to="/" style={{ textDecoration: 'none', color: '#0000ff' }}>home page</Link>.</p>
        </div>
    </div>
  )
}

export default NotFound