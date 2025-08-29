import { Link } from 'react-router-dom'

export default function PublicHome(){
  return (
    <div className="space-y-10 container-xl">
      {/* HERO */}
      <section className="p-0 overflow-hidden card">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Make today count ✨</h1>
            <p className="mt-4 text-sm md:text-base text-neutral-200">
              FlowGrid is a calm, fast task manager. Plan work, track progress, and ship —
              without the noise.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/signup" className="btn primary">Get Started Free</Link>
              <Link to="/about" className="btn">Learn more</Link>
            </div>
            <p className="mt-3 text-xs text-neutral-300">No credit card. Just focus.</p>
          </div>
          <div className="bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center min-h-[260px]" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-4">
        <h2 className="section-title">How to use FlowGrid</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {n:1, t:'Create your account', d:'Sign up and log in to your workspace.'},
            {n:2, t:'Add tasks fast', d:'Use “Create Task”. Set title, priority, status, due date, labels.'},
            {n:3, t:'Filter & search', d:'Combine status/priority/labels + full-text query. Sort & paginate.'},
            {n:4, t:'Track progress', d:'Stats show status/priority/overdue. Activity log records changes.'},
          ].map(s=>(
            <div key={s.n} className="card">
              <div className="text-xs opacity-70">Step {s.n}</div>
              <div className="mt-1 font-medium">{s.t}</div>
              <p className="mt-1 text-sm text-neutral-200">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="space-y-4">
        <h2 className="section-title">Why FlowGrid</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {title:'Focus Mode', desc:'Minimal UI, maximum clarity — less noise, more shipping.', emoji:'🎯'},
            {title:'Fast CRUD', desc:'Create/update instantly with optimistic UI.', emoji:'⚡'},
            {title:'Insightful Stats', desc:'Status, priority, overdue at a glance.', emoji:'📊'},
            {title:'Secure by Default', desc:'JWT auth and user-scoped tasks.', emoji:'🔒'},
          ].map((f)=>(
            <div key={f.title} className="card">
              <div className="text-2xl">{f.emoji}</div>
              <div className="mt-2 font-medium">{f.title}</div>
              <p className="mt-1 text-sm text-neutral-200">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 text-center text-white shadow-lg card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
        <h3 className="text-2xl font-semibold">Join the FlowGrid family!</h3>
        <p className="mt-1 opacity-95">Sign up today and build a calmer workflow.</p>
        <Link to="/signup" className="mt-4 bg-white border-transparent btn text-slate-900">Create your account</Link>
      </section>
    </div>
  )
}
