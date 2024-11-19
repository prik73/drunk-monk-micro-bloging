import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDb from './db/connectMongoDb.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form ka data(encoded)
app.use(cookieParser());
dotenv.config(); 




app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`hello on ${PORT}`)
    connectMongoDb();
})