import { Link } from 'react-router-dom'
import StatusSelect from './StatusSelect'
import Priority from './Priority'

export default function TaskItem({ task, onDelete, onToggleDone, onUpdateStatus }){
  const accent = task.priority==='high'?'task-accent-high': task.priority==='med'?'task-accent-med':'task-accent-low'
  return (
    <div className={`card ${accent} flex items-start justify-between gap-4`}>
      <div className="space-y-1">
        <div className="row">
          <Link to={`/task/${task._id}`} className="text-lg font-medium hover:underline underline-offset-4">{task.title}</Link>
          <div className="flex items-center gap-2">
            <Priority value={task.priority} />
            <StatusSelect value={task.status} onChange={(v)=> onUpdateStatus(task, v)} />
          </div>
        </div>
        <div className="max-w-2xl text-sm opacity-80">{task.description||'—'}</div>
        <div className="flex flex-wrap items-center gap-2 text-xs opacity-80">
          {task.dueDate && <span className="badge gray">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
          {task.labels?.map(l=> <span key={l} className="badge gray">{l}</span>)}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="btn" onClick={()=>onToggleDone(task)}>{task.status==='done'?'Mark Todo':'Mark Done'}</button>
        <button className="btn" onClick={()=>onDelete(task._id)}>Delete</button>
      </div>
    </div>
  )
}
