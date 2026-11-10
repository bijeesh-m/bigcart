

import express from "express"
import { addProduct } from "../controllers/productControllers.js"
import authenticate from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/add-product", authenticate, addProduct)


export default router