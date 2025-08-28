import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import TaskDetail from './pages/TaskDetail'
import Header from './components/Header'
import { useAuth } from './context/AuthContext'


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


export default function routes(setTheme, theme) {
return createBrowserRouter([
{ path: '/', element: <Navigate to="/app" replace /> },
{ path: '/login', element: <Login /> },
{ path: '/register', element: <Register /> },
{
path: '/app',
element: (
<Protected>
<Dashboard />
</Protected>
),
},
{
path: '/stats',
element: (
<Protected>
<Stats />
</Protected>
),
},
{
path: '/task/:id',
element: (
<Protected>
<TaskDetail />
</Protected>
),
},
])
}