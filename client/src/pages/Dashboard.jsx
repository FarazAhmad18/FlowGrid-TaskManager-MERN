import { useEffect, useMemo, useState } from 'react'
import api from '../api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import Filters from '../components/Filters'
import { toast } from 'react-hot-toast'

export default function Dashboard(){
  const [items,setItems]=useState([])
  const [meta,setMeta]=useState({ page:1,pages:1,limit:10,total:0 })
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [q,setQ]=useState('')
  const [status,setStatus]=useState('')
  const [priority,setPriority]=useState('')
  const [label,setLabel]=useState('')
  const [sort,setSort]=useState('-createdAt')
  const [kpi,setKpi]=useState(null)
  const [mode,setMode]=useState('list') // list | board

  const params=useMemo(()=>({ page,q,status,priority,label,sort,limit:8 }),[page,q,status,priority,label,sort])

  useEffect(()=>{ 
    setLoading(true)
    api.get('/tasks',{params})
      .then(res=>{ setItems(res.data.data.items); setMeta(res.data.data.meta) })
      .finally(()=>setLoading(false))
  },[params.page,params.q,params.status,params.priority,params.label,params.sort])

  useEffect(()=>{ api.get('/stats/overview').then(res=> setKpi(res.data.data)) },[])

  const createTask=async(body)=>{
    const tempId=`temp_${Date.now()}`; const optimistic={ _id:tempId, ...body }
    setItems(prev=>[optimistic,...prev])
    try{
      const {data}=await api.post('/tasks',body)
      setItems(prev=>prev.map(t=>t._id===tempId? data.data.task : t))
      toast.success('Task created')
    }catch(e){
      setItems(prev=>prev.filter(t=>t._id!==tempId))
      toast.error('Create failed'); throw e
    }
  }

  const deleteTask=async(id)=>{
    const keep=items.find(t=>t._id===id); setItems(prev=>prev.filter(t=>t._id!==id))
    try{ await api.delete(`/tasks/${id}`); toast.success('Task deleted') }
    catch(e){ setItems(prev=>[keep,...prev]); toast.error('Delete failed') }
  }

  const toggleDone=async(task)=>{
    const newStatus = task.status==='done' ? 'todo' : (task.status || 'done')
    const snapshot=[...items]
    setItems(prev=>prev.map(t=>t._id===task._id? {...t,status:newStatus}:t))
    try{ await api.put(`/tasks/${task._id}`,{ status:newStatus }) }
    catch(e){ setItems(snapshot); toast.error('Update failed') }
  }

  const Board=()=>{
    const cols=['todo','in-progress','done']
    const map=Object.fromEntries(cols.map(c=>[c,items.filter(t=>t.status===c)]))
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {cols.map(c=> (
          <div key={c} className="card">
            <div className="mb-3 capitalize section-title">{c.replace('-',' ')}</div>
            <div className="space-y-3">
              {map[c].length? map[c].map(t=> (
                <div key={t._id} className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <div className="font-medium">{t.title}</div>
                  <div className="subtle">{t.description||'—'}</div>
                </div>
              )): <div className="subtle">No tasks</div>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 container-xl">
      {/* HERO / PUNCHLINE */}
      <div className="py-10 text-center text-white shadow-lg card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
        <h1 className="text-3xl font-bold tracking-tight">FlowGrid</h1>
        <p className="mt-2 text-lg/relaxed opacity-95">Make today count ✨Organize smarter, live better.</p>
        <p className="opacity-90">Where your tasks flow. Write it. Plan it. Ship it.</p>
      </div>

      <div className="row">
        <h2 className="section-title">Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className={`btn ${mode==='list'?'primary':''}`} onClick={()=>setMode('list')}>List</button>
          <button className={`btn ${mode==='board'?'primary':''}`} onClick={()=>setMode('board')}>Board</button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="kpi"><div className="subtle">Todo</div><div className="text-3xl font-semibold">{kpi? (kpi.byStatus.find(s=>s._id==='todo')?.count||0): '—'}</div></div>
        <div className="kpi"><div className="subtle">In Progress</div><div className="text-3xl font-semibold">{kpi? (kpi.byStatus.find(s=>s._id==='in-progress')?.count||0): '—'}</div></div>
        <div className="kpi"><div className="subtle">Overdue</div><div className="text-3xl font-semibold">{kpi? kpi.overdue : '—'}</div></div>
      </div>

      <Filters q={q} setQ={setQ} status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} label={label} setLabel={setLabel} sort={sort} setSort={setSort} />
      <TaskForm onCreate={createTask} />

      {loading ? (
        <div className="grid gap-3">{Array.from({length:4}).map((_,i)=> <div key={i} className="h-20 card skel"/>)}</div>
      ) : (
        mode==='list'
          ? <TaskList items={items} meta={meta} setPage={setPage} onDelete={deleteTask} onToggleDone={toggleDone} />
          : <Board />
      )}
    </div>
  )
}
