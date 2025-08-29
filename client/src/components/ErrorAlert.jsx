export default function ErrorAlert({ title = "Something went wrong", messages = [] }) {
  if (!messages?.length) return null
  return (
    <div className="border-red-300 card dark:border-red-500/40 bg-red-50/60 dark:bg-red-500/10">
      <div className="text-sm font-medium text-red-700 dark:text-red-300">{title}</div>
      <ul className="pl-5 mt-2 space-y-1 list-disc">
        {messages.map((m, i) => (
          <li key={i} className="text-sm text-red-700/90 dark:text-red-300/90">{m}</li>
        ))}
      </ul>
    </div>
  )
}
