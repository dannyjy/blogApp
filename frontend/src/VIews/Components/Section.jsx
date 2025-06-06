import { Outlet, Link } from "react-router-dom"
import "../../Styles/main.scss"

const Section = () => {
  return (
    <div className="section">
        <h1><Link to="/">Home</Link></h1>
        <div className="section-content">
          <Outlet />
        </div>
    </div>
  )
}

export default Section