import express from 'express'
import path from "path";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv'
import connectMongoDb from './db/connectMongoDb.js';

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from "./routes/notification.route.js";
import cors from 'cors'
import hateSpeechRoutes from './routes/hateSpeechDetection.route.js';


const app = express();
const PORT = process.env.PORT || 8000
const __dirname = path.resolve()

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config(); 




app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true })); // to parse form ka data(encoded)
app.use(cookieParser());

console.log(process.env.OPENAI_API_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})




app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/hate-speech-detection", hateSpeechRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, ()=>{
    console.log(`hello on ${PORT}`)
    connectMongoDb();
})