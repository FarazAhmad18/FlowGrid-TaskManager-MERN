import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const { pathname } = useLocation()

  const NavBtn = ({to, children}) => (
    <Link to={to} className={`btn ${pathname===to? 'primary':''}`}>{children}</Link>
  )

  // derive first letter for avatar
  const firstLetter =
    (user?.name?.trim()?.[0] || user?.email?.trim()?.[0] || 'F').toUpperCase()

  return (
    <div className="py-5 container-xl">
      <div className="row">
        <Link to="/app" className="text-2xl font-semibold tracking-tight">FlowGrid</Link>

        <div className="flex items-center gap-2">
          <NavBtn to="/app">Dashboard</NavBtn>
          <NavBtn to="/stats">Stats</NavBtn>
          <NavBtn to="/account">Account</NavBtn>

          {/* Avatar with first letter only (links to Account) */}
          <Link to="/account" className="flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full bg-neutral-200 dark:bg-neutral-800">
            {firstLetter}
          </Link>

          <button className="btn" onClick={()=>{logout(); nav('/login')}}>Logout</button>
        </div>
      </div>
    </div>
  )
}
