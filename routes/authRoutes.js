import express from "express";
import { loginController, registerController } from "../controllers/authContoller.js";

const router = express.Router();

// Register - Post
router.post("/register", registerController);

// Login - Post
router.post("/login", loginController);

export default router;
