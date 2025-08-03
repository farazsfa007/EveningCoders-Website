import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './connection/db.js';
import certificateRoutes from './routes/certificateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connection with MongoDB
connectDB(); 

// Middlewares
app.use(express.json());
app.use(cors());

// Route
app.use('/api', certificateRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
});

