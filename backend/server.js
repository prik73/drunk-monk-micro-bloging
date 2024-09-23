import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDb from './db/connectMongoDb.js';

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
dotenv.config(); 




app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log('hello on 8000')
    connectMongoDb();
})