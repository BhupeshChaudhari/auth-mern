import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
dotenv.config();

//MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//server
const app = express();
app.listen(3000, () => {
  console.log("server listening on port 3000..");
});

//Routes
app.use("/api/user", userRoutes);
