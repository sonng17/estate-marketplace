import express from "express";
import { signup } from "../controllers/auth.controller.js";

// create user router
const router = express.Router();

router.post("/signup", signup); // create route 1

export default router;