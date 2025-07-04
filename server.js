import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
global.io = io;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/emergency', emergencyRoutes);

io.on('connection', (socket) => {
  console.log('New WebSocket connection:', socket.id);
});

app.get('/',(req,res)=>{
    res.send('ERAS Backend is Running Successfully')
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
