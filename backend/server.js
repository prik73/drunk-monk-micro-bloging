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



const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true })); // to parse form ka data(encoded)
app.use(cookieParser());
dotenv.config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})




app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, ()=>{
    console.log(`hello on ${PORT}`)
    connectMongoDb();
})