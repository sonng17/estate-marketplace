import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
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