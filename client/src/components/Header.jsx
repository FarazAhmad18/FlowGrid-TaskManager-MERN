import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const { pathname } = useLocation()

  const NavBtn = ({to, children}) => (
    <Link to={to} className={`btn ${pathname===to? 'primary':''}`}>{children}</Link>
  )

  const toggleTheme = () => {
    const root=document.documentElement
    const dark = root.classList.toggle('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  return (
    <div className="py-5 container-xl">
      <div className="row">
        <Link to="/app" className="text-2xl font-semibold tracking-tight">FlowGrid</Link>
        <div className="flex items-center gap-2">
          <NavBtn to="/app">Dashboard</NavBtn>
          <NavBtn to="/stats">Stats</NavBtn>
          <button className="btn ghost" onClick={toggleTheme}>Theme</button>
          <span className="hidden sm:inline subtle">{user?.name}</span>
          <button className="btn" onClick={()=>{logout(); nav('/login')}}>Logout</button>
        </div>
      </div>
    </div>
  )
}
