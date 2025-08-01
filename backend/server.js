import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './connection/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); 

app.use(express.json());
app.use(cors);

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
});

