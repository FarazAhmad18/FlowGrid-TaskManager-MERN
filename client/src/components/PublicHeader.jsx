import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicHeader(){
  const { pathname } = useLocation()
  const { token } = useAuth()
  const Nav = ({to, children}) => (
    <Link to={to} className={`btn ${pathname===to ? 'primary':''}`}>{children}</Link>
  )
  return (
    <div className="py-5 container-xl">
      <div className="row">
        <Link to="/" className="text-2xl font-semibold tracking-tight">FlowGrid</Link>
        <div className="flex items-center gap-2">
          <Nav to="/">Home</Nav>
          <Nav to="/about">About</Nav>
          <Nav to="/contact">Contact</Nav>
          {token ? (
            <Link to="/app" className="btn primary">Go to App</Link>
          ) : (
            <>
              <Link to="/login" className="btn">Log in</Link>
              <Link to="/signup" className="btn primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
