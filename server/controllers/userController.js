import mongoose from "mongoose";
import { userSchema } from "../models/userModel.js";
const User = mongoose.model("User", userSchema);

// I have installed npm install jsonwebtoken
import jwt from "jsonwebtoken";
const createToken = (_id) => {
  // the second argumnet schould be in a env file
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); // doe sit return the whole usr or just the email
    // create a token
    const token = createToken(user._id);
    const nativeLanguage = user.nativeLanguage;
    const foreignLanguage = user.foreignLanguage;

    res.status(200).json({ email, token, nativeLanguage, foreignLanguage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user

export const signupUser = async (req, res) => {
  const { email, password, nativeLanguage, foreignLanguage } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      nativeLanguage,
      foreignLanguage,
    );
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token, nativeLanguage, foreignLanguage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
