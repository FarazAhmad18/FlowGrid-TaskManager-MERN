import { useEffect, useState } from 'react'
import api from '../api'

export default function Stats(){
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{ api.get('/stats/overview').then(res=> setData(res.data.data)).finally(()=>setLoading(false)) },[])
  const Bar = ({label,count}) => (
    <div>
      <div className="flex justify-between mb-1 text-sm"><span className="subtle">{label}</span><span className="font-medium">{count}</span></div>
      <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-900"><div className="h-2 rounded-full bg-neutral-900 dark:bg-white" style={{width:`${Math.min(count*10,100)}%`}}/></div>
    </div>
  )
  if(loading) return <div className="container-xl"><div className="h-24 card skel"/></div>
  if(!data) return null
  const statusMap=Object.fromEntries(data.byStatus.map(s=>[s._id,s.count]))
  const prioMap=Object.fromEntries(data.byPriority.map(s=>[s._id,s.count]))
  return (
    <div className="space-y-6 container-xl">
      <h1 className="section-title">Stats</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="kpi"><div className="subtle">Todo</div><div className="text-3xl font-semibold">{statusMap['todo']||0}</div></div>
        <div className="kpi"><div className="subtle">In Progress</div><div className="text-3xl font-semibold">{statusMap['in-progress']||0}</div></div>
        <div className="kpi"><div className="subtle">Done</div><div className="text-3xl font-semibold">{statusMap['done']||0}</div></div>
      </div>
      <div className="space-y-4 card">
        <div className="section-title">By Status</div>
        <Bar label="Todo" count={statusMap['todo']||0} />
        <Bar label="In Progress" count={statusMap['in-progress']||0} />
        <Bar label="Done" count={statusMap['done']||0} />
      </div>
      <div className="space-y-4 card">
        <div className="section-title">By Priority</div>
        <Bar label="Low" count={prioMap['low']||0} />
        <Bar label="Medium" count={prioMap['med']||0} />
        <Bar label="High" count={prioMap['high']||0} />
      </div>
      <div className="card row"><div className="subtle">Overdue (not done)</div><div className="text-3xl font-semibold">{data.overdue}</div></div>
    </div>
  )
}
