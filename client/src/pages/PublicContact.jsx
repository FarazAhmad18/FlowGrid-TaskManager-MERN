import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function PublicContact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const submit = (e)=>{
    e.preventDefault()
    // no backend — just a pleasant UX
    toast.success('Thanks! We’ll get back to you soon.')
    setForm({ name:'', email:'', message:'' })
  }
  return (
    <div className="space-y-8 container-xl">
      <h1 className="section-title">Contact</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={submit} className="space-y-3 card">
          <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          <input className="input" placeholder="Your email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          <textarea className="h-32 input" placeholder="Message" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required />
          <button className="btn primary">Send</button>
        </form>
        <div className="card">
          <div className="font-medium">Get in Touch</div>
          <p className="mt-2 text-sm opacity-80">We love feedback and feature ideas. Reach out anytime.</p>
          <div className="mt-4 text-sm">
            <div>Email: <span className="opacity-80">hello@flowgrid.app</span></div>
            <div>Twitter/X: <span className="opacity-80">@flowgrid</span></div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <div className="bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center min-h-[220px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
