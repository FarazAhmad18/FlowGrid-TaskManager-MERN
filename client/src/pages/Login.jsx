import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import ErrorAlert from '../components/ErrorAlert'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errTitle, setErrTitle] = useState('')
  const [errList, setErrList] = useState([])
  const [loading, setLoading] = useState(false)

  const parseErrors = (e) => {
    const data = e?.response?.data || {}
    const list = (data.errors || []).map(x => x.msg).filter(Boolean)
    const title = data.message || 'Login failed'
    return { title, list: list.length ? list : [title] }
  }

  const submit = async (e) => {
    e.preventDefault()
    setErrTitle(''); setErrList([]); setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      nav('/app')
    } catch (e) {
      const { title, list } = parseErrors(e)
      setErrTitle(title); setErrList(list)
      toast.error(list[0] || title)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md px-4 py-24 mx-auto">
      <div className="mb-6 text-center card">
        <h1 className="text-2xl font-bold">Welcome to FlowGrid 🚀</h1>
        <p className="mt-1 text-sm opacity-70">Make today count — Organize smarter, live better.</p>
      </div>

      {errList.length > 0 && <div className="mb-4"><ErrorAlert title={errTitle} messages={errList} /></div>}

      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="w-full btn primary" disabled={loading}>{loading ? 'Loading…' : 'Login'}</button>
      </form>

      <div className="mt-4 text-sm opacity-70">
        No account? <Link className="link" to="/register">Create one</Link>
      </div>
    </div>
  )
}
