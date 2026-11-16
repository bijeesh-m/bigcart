
import express from 'express'
import { addToCart, getUserCart } from '../controllers/cartControllers.js';
import authenticate from '../middlewares/authMiddleware.js';
const router = express.Router()


router.post("/add-to-cart",authenticate, addToCart )
router.get("/cart",authenticate, getUserCart )




export default router;