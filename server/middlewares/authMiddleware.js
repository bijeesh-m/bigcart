import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required. Please log in.", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid authentication token.", success: false });
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User account no longer exists.", success: false });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Session expired or invalid token. Please log in again.", success: false });
    }
};

export const authorize = (...roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Login required", success: false });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access forbidden: insufficient permissions", success: false });
        }

        next();
    };
};

export default authenticate;
