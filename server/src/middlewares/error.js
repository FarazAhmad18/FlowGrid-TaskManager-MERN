export const notFoundHandler = (req, res, next) => {
res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};


export const errorHandler = (err, _req, res, _next) => {
console.error(err);
const status = err.status || 500;
const message = err.message || 'Server error';
res.status(status).json({ success: false, message });
};