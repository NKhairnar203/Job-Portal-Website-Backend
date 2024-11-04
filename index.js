// packages imports:
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import color from "colors";
import morgan from "morgan";
import cors from "cors";

// files imports
import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import testRoute from "./routes/testRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from './routes/userRoutes.js'
import jobRoutes from "./routes/jobRoutes.js"


// dotenv config:
dotenv.config();

// mongodb connection
connectDB();

const app = express();

// middlewares:
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes:
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoutes);

// validation middleares:
app.use(errorMiddleware);

// port
const Port = process.env.PORT || 8080;
// listen:
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`.bgYellow.red);
});
