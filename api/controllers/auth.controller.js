import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//SignUp
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
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

//SignIn
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const { password: hashPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date(Date.now() + 3600000));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("token", token, { httpsOnly: true, expires: expiryDate })
      .status(200)
      .json({
        data: rest,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};
