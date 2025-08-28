export default function Filters({ q, setQ, status, setStatus, priority, setPriority, label, setLabel, sort, setSort }){
  return (
    <div className="space-y-4 card">
      <div className="section-title">Filters</div>
      <div className="grid gap-3 md:grid-cols-6">
        <input className="input md:col-span-2" placeholder="Search title/description" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">Status: All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select className="select" value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="">Priority: All</option>
          <option value="low">Low</option>
          <option value="med">Medium</option>
          <option value="high">High</option>
        </select>
        <input className="input" placeholder="Labels (comma separated)" value={label} onChange={e=>setLabel(e.target.value)} />
        <select className="select" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="-createdAt">Sort: Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="dueDate">Due Date ↑</option>
          <option value="-dueDate">Due Date ↓</option>
          <option value="priority">Priority ↑</option>
          <option value="-priority">Priority ↓</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={`pill ${!status&&!priority&&!q&&!label ? 'active':''}`}
          onClick={()=>{ setQ(''); setStatus(''); setPriority(''); setLabel('') }}
        >
          Clear all
        </button>
        <span className="subtle">Pro tip: combine search + labels for laser focus.</span>
      </div>
    </div>
  )
}
