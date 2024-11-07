// API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// packages imports:
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import color from "colors";
import morgan from "morgan";
import cors from "cors";
// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// files imports
import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import testRoute from "./routes/testRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

// dotenv config:
dotenv.config();

// mongodb connection
connectDB();

// swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerDoc(options);

const app = express();

// middlewares:
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes:
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoutes);

// home Route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// validation middleares:
app.use(errorMiddleware);

// port
const Port = process.env.PORT || 8080;
// listen:
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`.bgYellow.red);
});
