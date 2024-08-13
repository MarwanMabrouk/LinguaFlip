import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userSchema } from "../models/userModel.js";

const User = mongoose.model("User", userSchema);

export const requireAuth = async (req, res, next) => {
  // verify that the user is authenticated
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization;
  try {
    // verify token
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    console.log("jhere", req.user);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ error: "Request is not authorized" + error.message });
  }
};

// Import it later in routes/record
// const requireAuth = require ('../middleware/requireAuth.js')

// after the declaration of the router = express.Router() we have to put ->
// router.use(requireAuth);

// to protect everything that there is below
