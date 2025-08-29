import TaskItem from './TaskItem'
import Pagination from './Pagination'

export default function TaskList({ items, meta, setPage, onDelete, onToggleDone, onUpdateStatus }) {
  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="py-12 text-center card">
          <p className="text-lg font-medium">No tasks yet 🎉</p>
          <p className="text-sm opacity-70">Make today count — add your first task and keep the momentum.</p>
        </div>
      )}
      {items.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onDelete={onDelete}
          onToggleDone={onToggleDone}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
      <Pagination page={meta.page} pages={meta.pages} setPage={setPage} />
    </div>
  )
}
