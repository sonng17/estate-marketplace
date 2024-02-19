import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";

// create auth router
const router = express.Router();

router.post("/signup", signup); // create route 1

router.post("/signin", signin); // create route 1

export default router;