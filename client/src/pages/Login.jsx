import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      nav('/app')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Login failed'
      setErr(msg)
      toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md px-4 py-24 mx-auto">
      <div className="mb-6 text-center card">
        <h1 className="text-2xl font-bold">Welcome to FlowGrid 🚀</h1>
        <p className="mt-1 text-sm opacity-70">Make today count — Organize smarter, live better.</p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full btn primary" disabled={loading}>{loading ? 'Loading…' : 'Login'}</button>
      </form>
      <div className="mt-4 text-sm opacity-70">No account? <Link className="link" to="/register">Create one</Link></div>
    </div>
  )
}
