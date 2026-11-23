import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import usersRoutes from "./routes/usersRoute.js"
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express();
import dns from "dns"


dns.setServers(["8.8.8.8"])

// to convert json data to original form
app.use(express.json())
app.use(cors({ origin: "https://bigcart.vercel.app", credentials:true }))

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
app.use(usersRoutes)

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})

