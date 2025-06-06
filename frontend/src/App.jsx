import Nav from "./VIews/Components/Nav"
import {Outlet} from "react-router-dom"
import "./Styles/main.scss"
import Footer from "./VIews/Components/Footer"

function App() {

  return (
    <div className="App">
      <Nav />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
