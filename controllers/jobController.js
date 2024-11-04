import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import moment from "moment";

// *****************  CREATE JOB  ****************
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  res.status(201).json(job);
};

// ***************  GET JOBS  ************************
export const getAllJobCrontroller = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  // condition for searching:
  const queryObj = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObj.status = status;
  }
  if (workType && workType !== "all") {
    queryObj.workType = workType;
  }

  if (search) {
    queryObj.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobModel.find(queryObj);

  // sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  // job count
  const jobCount = await jobModel.countDocuments(queryObj);
  const numOfPage = Math.ceil(jobCount / limit);

  const jobs = await queryResult;

  res.status(200).json({
    jobCount,
    jobs,
    numOfPage,
  });
};

// ***************** UPDATE JOBS  **********************
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  // validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  // find job
  const job = await jobModel.findById({ _id: id });
  if (!job) {
    next("Job Not Found");
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  // update job
  const updatedJob = await jobModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updatedJob });
};

// **************** DELETE JOB  ******************
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobModel.findById({ _id: id });
  if (!job) {
    next("Job Not Found");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to delete this job");
    return;
  }
  await jobModel.findByIdAndDelete({ _id: id });
  res.status(200).json({ message: "Job Deleted Successfully" });
};

// ****************  JOB STATS & FILTER  ******************
export const jobStatsController = async (req, res) => {
  const stats = await jobModel.aggregate([
    // search by user
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  let monthlyApplication = await jobModel.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ totalStats: stats.length, stats, monthlyApplication });
};
