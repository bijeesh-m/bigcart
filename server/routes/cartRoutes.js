
import express from 'express'
import { addToCart, getUserCart, removeFromCart, updateQuantity } from '../controllers/cartControllers.js';
import authenticate from '../middlewares/authMiddleware.js';
const router = express.Router()


router.post("/add-to-cart",authenticate, addToCart )
router.get("/cart",authenticate, getUserCart )
router.delete("/cart/:prodId", authenticate, removeFromCart)
router.put("/cart/:prodId/:action", authenticate, updateQuantity)




export default router;