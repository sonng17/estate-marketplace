import express from "express";
import { test1, test2 } from "../controllers/user.controller.js";

// create user router
const router = express.Router();

router.get("/test-1", test1); // create route 1
router.get("/test-2", test2); // create route 2

export default router;