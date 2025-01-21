import express from "express";
import { login, register, saveAddress, getAddress } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"; 

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/address", authMiddleware, saveAddress); 
userRouter.get("/address", authMiddleware, getAddress);  

export default userRouter;
