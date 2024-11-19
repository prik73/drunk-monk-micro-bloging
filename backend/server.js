import express from 'express'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { v2 as cloudinary } from "cloudinary"

import dotenv from 'dotenv'
import connectMongoDb from './db/connectMongoDb.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
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

app.listen(PORT, ()=>{
    console.log(`hello on ${PORT}`)
    connectMongoDb();
})