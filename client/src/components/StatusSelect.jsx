export default function StatusSelect({ value, onChange }){
  const opts=[
    {v:'todo', label:'Todo'},
    {v:'in-progress', label:'In Progress'},
    {v:'done', label:'Done'}
  ]
  const color = value==='done'?'green': value==='in-progress'?'amber':'gray'
  return (
    <div className={`badge ${color}`}>
      <select className="bg-transparent focus:outline-none" value={value} onChange={e=>onChange(e.target.value)}>
        {opts.map(o=> <option key={o.v} value={o.v}>{o.label}</option>)}
      </select>
    </div>
  )
}
