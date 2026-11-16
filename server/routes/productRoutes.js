
import express from "express"
import { addProduct, getAllProducts } from "../controllers/productControllers.js"
import authenticate from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/products", authenticate, addProduct);
router.get("/products", getAllProducts)


export default router