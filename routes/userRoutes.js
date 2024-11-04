import express from "express";
import { useAuth } from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

// routes

// GET USERS - GET

// UPDATE USER - PUT
router.put("/update-user", useAuth, updateUserController);

export default router;
