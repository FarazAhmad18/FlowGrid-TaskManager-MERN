import dotenv from 'dotenv';
dotenv.config();


export const env = {
MONGO_URI: process.env.MONGO_URI || '',
JWT_SECRET: process.env.JWT_SECRET || 'dev_secret',
PORT: Number(process.env.PORT) || 4000,
CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
};