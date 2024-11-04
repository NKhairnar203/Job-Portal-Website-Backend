import express from "express";
import { testPostController } from "../controllers/testController.js";
import { useAuth } from "../middlewares/authMiddleware.js";

const testRoute = express.Router();

testRoute.post("/test-post", useAuth, testPostController);

export default testRoute;
