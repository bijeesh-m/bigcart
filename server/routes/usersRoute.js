import express from 'express'
import { getAllUsers } from '../controllers/usersControllers.js';
import authenticate, { authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();



router.get("/admin/users", authenticate, authorize("admin", "manager"), getAllUsers)






export default router