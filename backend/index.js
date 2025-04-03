import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express(); // ✅ Initialize app first

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ Use after initialization
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
