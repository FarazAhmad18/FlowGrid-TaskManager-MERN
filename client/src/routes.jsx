import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import TaskDetail from './pages/TaskDetail'
import Header from './components/Header'
import { useAuth } from './context/AuthContext'

// Public site
import PublicHeader from './components/PublicHeader'
import PublicHome from './pages/PublicHome'
import PublicAbout from './pages/PublicAbout'
import PublicContact from './pages/PublicContact'

// Account
import Account from './pages/Account'

const PublicOnly = ({ children }) => {
  const { token } = useAuth()
  if (token) return <Navigate to="/app" replace />
  return children
}

const Protected = ({ children }) => {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      <Header />
      {children}
    </div>
  )
}

const PublicLayout = ({ children }) => (
  <div className="max-w-6xl px-4 py-6 mx-auto">
    <PublicHeader />
    {children}
  </div>
)

export default function routes(){
  return createBrowserRouter([
    // Public (auto-redirect to /app if logged in)
    { path: '/', element: <PublicOnly><PublicLayout><PublicHome /></PublicLayout></PublicOnly> },
    { path: '/about', element: <PublicOnly><PublicLayout><PublicAbout /></PublicLayout></PublicOnly> },
    { path: '/contact', element: <PublicOnly><PublicLayout><PublicContact /></PublicLayout></PublicOnly> },

    // Auth pages SHOULD also show PublicHeader
    { path: '/login', element: <PublicOnly><PublicLayout><Login /></PublicLayout></PublicOnly> },
    { path: '/register', element: <PublicOnly><PublicLayout><Register /></PublicLayout></PublicOnly> },
    { path: '/signup', element: <Navigate to="/register" replace /> },

    // App (protected)
    { path: '/app', element: <Protected><Dashboard /></Protected> },
    { path: '/stats', element: <Protected><Stats /></Protected> },
    { path: '/task/:id', element: <Protected><TaskDetail /></Protected> },
    { path: '/account', element: <Protected><Account /></Protected> },

    // Fallback
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
