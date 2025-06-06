import Nav from "./VIews/Components/Nav"
import {Outlet, useLocation} from "react-router-dom"
import "./Styles/main.scss"
import Footer from "./VIews/Components/Footer"
import Aside from "./VIews/Components/Aside"
import Section from "./VIews/Components/Section"

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Nav />
      <main className="main-content">
        {
          location.pathname === "/" ?
          (
            <div className="blog-section">
              <Aside />
              <Section />
            </div>
          ) :
          <Outlet />
        }        
      </main>
      <Footer />
    </div>
  )
}

export default App
