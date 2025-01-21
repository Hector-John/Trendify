import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// JWT TOKEN
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// LOGIN LOGIC
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const userExist = await bcrypt.compare(password, user.password);
        if (!userExist) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error logging in" });
    }
};

// REGISTER
const register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // VALIDATING STRONG PASSWORD AND EMAIL FORMAT
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // HASHING THE PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// SAVE ADDRESS
const saveAddress = async (req, res) => {
    const userId = req.user.id; // Retrieved from auth middleware
    const address = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { address },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "Address saved successfully", address: user.address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving address" });
    }
};

// GET ADDRESS
const getAddress = async (req, res) => {
    const userId = req.user.id; // Retrieved from auth middleware

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, address: user.address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving address" });
    }
};

export { login, register, saveAddress, getAddress };
