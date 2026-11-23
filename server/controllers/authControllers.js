import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists", success: false });
        }

        const newUser = await User.create({ name, email, password, phone });
        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({ message: "Registration completed successfully", success: true, user: userObj });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const isExist = await User.findOne({ email: email });

        if (!isExist) {
            return res.status(404).json({ success: false, message: "User does not exist!" });
        }

        const auth = await bcrypt.compare(password, isExist.password);
        if (!auth) {
            return res.status(401).json({ message: "Incorrect password!", success: false });
        }

        const token = jwt.sign(
            { id: isExist._id, email: isExist.email, role: isExist.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        const userResponse = isExist.toObject();
        delete userResponse.password;

        res.status(200).json({ message: "Login success", success: true, user: userResponse });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax"
        });
        res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getUser = async (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
