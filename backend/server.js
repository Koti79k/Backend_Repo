import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import taskRoutes from './routes/taskRoute.js';
import feedRoutes from './routes/feedRoute.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000
const database_url = process.env.DATABASE_URL;

// Apply CORS middleware
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:8080'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.use('/api/feed', feedRoutes);


mongoose
  .connect(database_url)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log("Database connection error: ", err));

app.listen(PORT,()=>{console.log(`server running at ${PORT}`);
})