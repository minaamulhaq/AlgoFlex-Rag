import express from "express";
import cors from "cors";
const app = express();


import 'dotenv/config';
import chatRouter from "./routes/chat.routes.js";

import { connectDB } from "./db/db.js";
import webhookroute from "./routes/webhook.routes.js";
import dotenv from "dotenv";

import { clerkMiddleware, requireAuth } from '@clerk/express';
import keyRouter from "./routes/key.routes.js";
import uploadFileRouter from "./routes/upload.routes.js";
dotenv.config();





app.use(clerkMiddleware())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],

}));
const PORT = process.env.PORT || 5000;
app.use("/api", webhookroute);
// ✅ Parse JSON bodies
app.use(express.json());
app.use("/api", uploadFileRouter);
app.use("/api", keyRouter);
app.use("/api", chatRouter);
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});





connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});