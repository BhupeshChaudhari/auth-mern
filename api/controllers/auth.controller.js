import User from "../models/user.model.js";
import bccryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bccryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created Succesfully",
    });
  } catch (error) {
    next(error);
  }
};
