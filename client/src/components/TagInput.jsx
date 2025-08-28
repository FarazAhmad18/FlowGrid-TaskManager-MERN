import { useState } from 'react'

export default function TagInput({ value, onChange }){
  const [text, setText]=useState('')
  const tags = (value||'').split(',').map(s=>s.trim()).filter(Boolean)

  const add=(t)=>{ const v=[...tags,t].join(','); onChange(v) }
  const remove=(t)=>{ const v=tags.filter(x=>x!==t).join(','); onChange(v) }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(t=> (
          <span key={t} className="badge gray">
            {t}
            <button className="ml-1 subtle" type="button" onClick={()=>remove(t)}>×</button>
          </span>
        ))}
      </div>
      <div className="row">
        <input className="input" placeholder="Add label and press Add" value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn" type="button" onClick={()=>{ if(text.trim()){ add(text.trim()); setText('') }}}>Add</button>
      </div>
    </div>
  )
}
