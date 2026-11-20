
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const authenticate = async (req, res, next) => {

    const token = req.cookies.token
    console.log("token", token);

    if (!token) {
        return res.status(500).json({ message: "token not found!", success: false })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    req.user = user;

    if (!decoded) {
        return res.status(401).json({ message: "invalid token", success: false })
    }

    next()
}


export const authorize = (...roles) => {

    return async (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ message: "login required", success: false })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "unauthorized attempt", success: false })
        }

        next()

    }

}

export default authenticate