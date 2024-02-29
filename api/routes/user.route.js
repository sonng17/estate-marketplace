import express from "express";
import { test1, test2, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// create user router
const router = express.Router();

router.get("/test-1", test1); // create route 1
router.get("/test-2", test2); // create route 2
router.post("/update/:id",verifyToken, updateUser); // create route 2
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;
