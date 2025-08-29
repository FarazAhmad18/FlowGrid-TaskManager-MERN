import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Account(){
  const nav = useNavigate()
  const { user, logout } = useAuth()
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const canDelete = confirm.trim().toUpperCase() === 'DELETE'
  const initials = (user?.name || '').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()

  const handleDelete = async () => {
    if (!canDelete) return
    setLoading(true)
    try {
      await api.delete('/auth/me')
      toast.success('Account deleted')
      logout()
      nav('/register')
    } catch (e) {
      const msg = e?.response?.data?.message || 'Could not delete account'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 container-xl">
      <h1 className="section-title">Account</h1>

      {/* Profile card */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-sm font-semibold rounded-full bg-neutral-200 dark:bg-neutral-800">
            {initials || 'FG'}
          </div>
          <div>
            <div className="text-lg font-medium">{user?.name || '—'}</div>
            <div className="subtle">{user?.email || '—'}</div>
          </div>
        </div>
        <p className="mt-4 text-sm opacity-70">
          (Coming soon: change password, update profile, export data)
        </p>
      </div>

      {/* Danger zone */}
      <div className="border-red-300 card dark:border-red-500/40">
        <div className="mb-2 section-title">Danger Zone</div>
        <p className="text-sm opacity-80">
          Deleting your account will permanently remove your profile and all tasks. This action cannot be undone.
        </p>

        <div className="grid gap-3 mt-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 subtle">
              Type <b>DELETE</b> to confirm
            </label>
            <input className="input" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="DELETE" />
          </div>
          <div className="flex items-end">
            <button className={`btn ${canDelete ? 'primary' : ''}`} disabled={!canDelete || loading} onClick={handleDelete}>
              {loading ? 'Deleting…' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
