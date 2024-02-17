import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config(); // initialize

// Server
const app = express();

app.use(express.json()); // allow JSON as input of server when user use post method send infomation to server

app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!");
});

// Connect to Database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  }) //Check if connected success
  .catch((err) => {
    console.log(err);
  }); //Check if connected fail

// Create and test api user, auth route in application
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Middleware: handle error to shorten and avoid repetitive code, give more comprehensive error
app.use((err, req, res, next) => {
  // Status code and message of error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // Response to client
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
