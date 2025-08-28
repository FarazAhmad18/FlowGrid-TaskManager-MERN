import { useState } from 'react'
import TagInput from './TagInput'
import Priority from './Priority'

export default function TaskForm({ onCreate }){
  const [form,setForm]=useState({ title:'', description:'', priority:'med', status:'todo', dueDate:'', labels:'' })
  const [loading,setLoading]=useState(false)

  const submit=async(e)=>{
    e.preventDefault(); setLoading(true)
    try{
      const body={...form, labels: form.labels? form.labels.split(',').map(s=>s.trim()).filter(Boolean):[]}
      await onCreate(body)
      setForm({ title:'', description:'', priority:'med', status:'todo', dueDate:'', labels:'' })
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-4 card">
      <div className="section-title">Create Task</div>
      <div className="grid gap-3 md:grid-cols-5">
        <input className="input md:col-span-2" placeholder="Title*" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
        <input className="input md:col-span-2" placeholder="Short description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        <input type="date" className="input" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/>
        <select className="select" value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
          <option value="low">Low</option>
          <option value="med">Medium</option>
          <option value="high">High</option>
        </select>
        <select className="select" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="md:col-span-3">
          <TagInput value={form.labels} onChange={(v)=>setForm(f=>({...f, labels:v}))} />
        </div>
        <div className="flex items-center md:col-span-2"><Priority value={form.priority}/></div>
        <button className="btn primary md:col-span-1" disabled={loading}>{loading?'Saving…':'Add Task'}</button>
      </div>
    </form>
  )
}
