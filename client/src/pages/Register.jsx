import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function Register() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      await register(name, email, password)
      toast.success('Account created!')
      nav('/app')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Registration failed'
      const firstErr = e?.response?.data?.errors?.[0]?.msg
      const full = firstErr ? `${msg}: ${firstErr}` : msg
      setErr(full)
      toast.error(full)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md px-4 py-24 mx-auto">
      <div className="mb-6 text-center card">
        <h1 className="text-2xl font-bold">Create your FlowGrid account ✨</h1>
        <p className="mt-1 text-sm opacity-70">Where your tasks flow. Write it. Plan it. Ship it.</p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full btn primary" disabled={loading}>{loading ? 'Loading…' : 'Create account'}</button>
      </form>
      <div className="mt-4 text-sm opacity-70">Already have an account? <Link className="link" to="/login">Sign in</Link></div>
    </div>
  )
}
