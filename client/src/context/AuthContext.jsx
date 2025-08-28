import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'


const AuthCtx = createContext()


export function AuthProvider({ children }) {
const [token, setToken] = useState(localStorage.getItem('fg_token'))
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(!!token)


useEffect(() => {
if (!token) return
api.get('/auth/me')
.then((res) => setUser(res.data.data.user))
.catch(() => setToken(null))
.finally(() => setLoading(false))
}, [])


const login = async (email, password) => {
const { data } = await api.post('/auth/login', { email, password })
localStorage.setItem('fg_token', data.data.token)
setToken(data.data.token)
const me = await api.get('/auth/me')
setUser(me.data.data.user)
}


const register = async (name, email, password) => {
const { data } = await api.post('/auth/register', { name, email, password })
localStorage.setItem('fg_token', data.data.token)
setToken(data.data.token)
const me = await api.get('/auth/me')
setUser(me.data.data.user)
}


const logout = () => {
localStorage.removeItem('fg_token')
setUser(null)
setToken(null)
}


return (
<AuthCtx.Provider value={{ token, user, loading, login, register, logout }}>
{children}
</AuthCtx.Provider>
)
}


export const useAuth = () => useContext(AuthCtx)