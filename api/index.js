import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js";
dotenv.config() // initialize

// Server
const app = express();

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

  // Create and test api user route in application
  app.use('/api/user', userRouter)