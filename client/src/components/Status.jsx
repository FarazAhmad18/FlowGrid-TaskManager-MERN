export default function Status({ value }) {
const map = {
'todo': 'border-neutral-300',
'in-progress': 'border-amber-400 text-amber-600',
'done': 'border-emerald-400 text-emerald-600'
}
return <span className={`badge ${map[value] || ''}`}>{value}</span>
}