import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import statsRoutes from './routes/stats.js';
import { notFoundHandler, errorHandler } from './middlewares/error.js';


dotenv.config();


const app = express();


app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());


app.get('/api/health', (_req, res) => {
res.json({ success: true, message: 'FlowGrid API OK' });
});


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/stats', statsRoutes);


app.use(notFoundHandler);
app.use(errorHandler);


mongoose
.connect(env.MONGO_URI)
.then(() => {
app.listen(env.PORT, () => {
console.log(`\n🚀 Server running on http://localhost:${env.PORT}`);
});
})
.catch((err) => {
console.error('Mongo connection error:', err);
process.exit(1);
});