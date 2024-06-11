import express from "express";


// contoller functions
import {signupUser, loginUser} from '../controllers/userContoller.js';
export const userRoutes = express.Router();


// login route

userRoutes.post('/login', loginUser);

// signup route
userRoutes.post('/signup', signupUser);

