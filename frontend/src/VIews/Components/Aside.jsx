import { useNavigate } from "react-router-dom"

const Aside = () => {
  const navigate = useNavigate();


  return (
    <aside className="aside">
      <h1>Categories</h1>
      <main className="categories">
        {
          buttons.map((button, index) => {
            return <button key={index} onClick={(e) => { navigate("#"); e.target.className = "active"; }}>{button.label}</button>
          })
        }
      </main>
    </aside>
  )
}

export default Aside

const buttons = [
  { label: 'C#', path: '/' },
  { label: 'Python', path: 'button-2' },
  { label: 'Swift', path: 'button-3' },
  { label: 'Java', path: 'button-4' },
  { label: 'JavaScript', path: 'button-5' },
]