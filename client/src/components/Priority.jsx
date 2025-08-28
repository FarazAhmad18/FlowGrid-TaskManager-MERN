export default function Priority({ value }){
  const map={ low:'green', med:'amber', high:'red' }
  const label={ low:'Low', med:'Medium', high:'High' }
  return <span className={`badge ${map[value]||'gray'}`}>Priority: {label[value]||'—'}</span>
}
