import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'


export default function TaskDetail() {
const { id } = useParams()
const [task, setTask] = useState(null)
const [loading, setLoading] = useState(true)


useEffect(() => {
api.get(`/tasks/${id}`).then(res => setTask(res.data.data.task)).finally(() => setLoading(false))
}, [id])


if (loading) return <div className="card m-6 h-24 skel" />
if (!task) return <div className="m-6">Not found</div>


return (
<div className="mx-auto max-w-3xl space-y-6">
<div className="card">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-semibold">{task.title}</h1>
<div className="text-sm opacity-70">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
</div>
<p className="mt-3 opacity-80">{task.description || 'No description.'}</p>
</div>


<div className="card">
<h2 className="font-medium mb-3">Activity Log</h2>
<div className="space-y-2">
{task.changes?.length ? task.changes.slice().reverse().map((c, i) => (
<div key={i} className="text-sm">
<span className="opacity-70">{new Date(c.changedAt).toLocaleString()}:</span>
<span className="ml-2">{c.field}</span>
<span className="ml-2 opacity-70">{String(c.oldValue)}</span>
<span className="mx-1">→</span>
<span className="font-medium">{String(c.newValue)}</span>
</div>
)) : <div className="opacity-70 text-sm">No changes yet.</div>}
</div>
</div>
</div>
)
}