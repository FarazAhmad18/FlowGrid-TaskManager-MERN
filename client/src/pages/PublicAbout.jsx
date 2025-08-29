import { Link } from 'react-router-dom'

export default function PublicAbout(){
  return (
    <div className="space-y-10 container-xl">
      {/* Our Story */}
      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="section-title">Our Story</h1>
          <p className="text-sm opacity-80">
            FlowGrid started with a simple idea: task apps should be calm and fast.
            Built on the MERN stack, it blends a minimal aesthetic with the features
            teams actually use: filters, search, labels, activity logs, and clear stats.
          </p>
          <p className="text-sm opacity-80">
            Today, FlowGrid helps students and interns organize projects, ship faster,
            and present a professional, live demo on their resumes.
          </p>
        </div>
        <div className="overflow-hidden border rounded-2xl border-neutral-200 dark:border-neutral-800">
<div
  className="bg-[url('https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1600&auto=format&fit=crop')] 
             bg-cover bg-center min-h-[260px] md:min-h-[320px]"
/>
        </div>
      </section>

      {/* Categories / Pillars */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1.5 bg-red-500 rounded" />
          <div className="text-sm font-medium">Pillars</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title:'Clarity', icon:'🧭', text:'Minimal UI for deep focus.' },
            { title:'Speed', icon:'⚡', text:'Optimistic updates & snappy filters.' },
            { title:'Insight', icon:'📊', text:'Stats via Mongo aggregations.' },
            { title:'Trust', icon:'🔐', text:'JWT auth + user-scoped data.' },
          ].map((c)=>(
            <div key={c.title} className="text-center card">
              <div className="text-2xl">{c.icon}</div>
              <div className="mt-2 font-medium">{c.title}</div>
              <p className="mt-1 text-xs opacity-70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-10 text-center text-white shadow-lg card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
        <h3 className="text-2xl font-semibold">Join the FlowGrid Family!</h3>
        <p className="mt-1 opacity-95">Early access to updates, product launches, and helpful resources.</p>
        <Link to="/signup" className="mt-4 text-black bg-white border-transparent btn">Become a Member</Link>
      </section>
    </div>
  )
}
