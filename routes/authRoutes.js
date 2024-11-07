import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authContoller.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const router = express.Router();

/**
 * @swagger
 * components:
 *  Schema:
 *    User:
 *      type:Object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - loaction
 *      properties:
 *        id:
 *          type:string
 *          description: The Auth-genrated id of user collection
 *        name:
 *          type:string
 *          description: user name
 *        lastName:
 *          type:string
 *          description: user Lastname
 *        email:
 *          type:string
 *          description: User Email Address
 *        password: 
 *          type:string
 *          description: user Password
 *        location:
 *          type:string
 *          description: user lOCATION
 *      example:
 *        id: fuiehu7w4984092kiu
 *        name: john 
 *        lastName: dev
 *        email: john.dev@gmail.com
 *        password: john@123
 *        location: America
 */

// Register - Post
router.post("/register", limiter, registerController);

// Login - Post
router.post("/login", limiter, loginController);

export default router;
