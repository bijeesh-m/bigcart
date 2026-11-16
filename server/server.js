import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express();

// to convert json data to original form
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials:true }))

// to access cookies
app.use(cookieParser())

// to access .env variables
dotenv.config()

// Establishing mongodb connection
connectDB()

// register routes
app.use(authRoutes);
app.use(productRoutes)
app.use(cartRoutes)

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})

