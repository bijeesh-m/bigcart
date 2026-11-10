
import express from 'express'
import { addToCart } from '../controllers/cartControllers.js';
const router = express.Router()


router.post("/add-to-cart/:userId",addToCart )




export default router;