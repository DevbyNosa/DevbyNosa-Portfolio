import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import { pool } from './config/database.js';
import { sessionConfig } from './config/session.js';
import cookieParser from 'cookie-parser';
import apiRoute from './routes/api.js'
import adminRoute from './routes/admin.js'


const app = express();
const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true                
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(cookieParser());


// Check health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use("/api", apiRoute);
app.use("/api/admin", adminRoute);

// Start the server

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();