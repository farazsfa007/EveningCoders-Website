import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import connectDB from "./connection/db.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

//Middleware

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api", certificateRoutes);

app.get("/", (req, res) => {
  res.send("Server is running & ready for certificate verification & uploads.");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
