import express from "express";

import { useAuth } from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobCrontroller,
  updateJobController,
  deleteJobController,
  jobStatsController,
} from "../controllers/jobController.js";
const router = express.Router();

// routes

// CREATE JOB - POST
router.post("/create-job", useAuth, createJobController);

// GET JOB - GET
router.get("/get-job", useAuth, getAllJobCrontroller);

// UPDATE JOB - PUT || PATCH
router.patch("/update-job/:id", useAuth, updateJobController);

// DELETE JOBS - DELETE
router.delete("/delete-job/:id", useAuth, deleteJobController);

//  JOBS STATS FILTER - GET
router.get("/job-stats", useAuth, jobStatsController);

export default router;
