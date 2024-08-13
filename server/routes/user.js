import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";

export const userRoutes = express.Router();

// login route
userRoutes.post("/login", loginUser);

// signup route
userRoutes.post("/signup", signupUser);
