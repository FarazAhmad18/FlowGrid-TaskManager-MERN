export default function Pagination({ page, pages, setPage }) {
if (pages <= 1) return null
return (
<div className="flex items-center justify-end gap-2 mt-4">
<button className="btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
<div className="text-sm opacity-70">Page {page} / {pages}</div>
<button className="btn" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
</div>
)
}