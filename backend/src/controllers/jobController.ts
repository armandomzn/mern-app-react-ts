import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JobSchema from "../models/JobSchema";
import { CustomRequest } from "../interfaces/CustomRequestType";
import mongoose from "mongoose";
import moment from "moment";
import { StatProps } from "../interfaces/StatProps";
import { StatsProps } from "../interfaces/StatsProps";
import { reverse } from "dns";

const createJob = async (req: CustomRequest, res: Response) => {
  // We add to the body request the user who is creating the actual job, this information is obtained from the token
  req.body.createdBy = req.user.userId;
  const job = await JobSchema.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ job, message: "Job Created Successfully" });
};

const getJob = async (req: Request, res: Response) => {
  // if the req.params.id does not exist this will be managed by express-validator middleware, by validateParamId custom middleware in his corresponding route
  const job = await JobSchema.findById({ _id: req.params.id });
  return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req: Request, res: Response) => {
  // if the req.params.id does not exist this will be managed by express-validator middleware, by validateParamId custom middleware in his corresponding route
  const removedJob = await JobSchema.findByIdAndDelete({ _id: req.params.id });
  return res
    .status(StatusCodes.OK)
    .json({ message: "Job Deleted Successfully", removedJob });
};
const updateJob = async (req: Request, res: Response) => {
  // if the req.params.id does not exist this will be managed by express-validator middleware, by validateParamId custom middleware in his corresponding route
  const updatedJob = await JobSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  return res
    .status(StatusCodes.OK)
    .json({ message: "Job Updated Successfully", updatedJob });
};

const getAllJobs = async (req: CustomRequest, res: Response) => {
  const jobs = await JobSchema.find({ createdBy: req.user.userId });
  return res.status(StatusCodes.OK).json({ jobs });
};

const showStats = async (req: CustomRequest, res: Response) => {
  let stats: StatProps[] = await JobSchema.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  let newStats: StatsProps = stats.reduce((prev, current: StatProps) => {
    const { _id, count } = current;
    prev[_id] = count;
    return prev;
  }, {} as { [key: string]: number });

  const defaultStats = {
    pending: newStats?.pending || 0,
    interview: newStats?.interview || 0,
    declined: newStats?.declined || 0,
  };
  let jobsPerMonth: { _id: { year: number; month: number }; count: number }[] =
    await JobSchema.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        // we sort in descending order, i.e. we obtain the last 6 results
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
      { $limit: 6 },
    ]); //[ { _id: { year: 2024, month: 2 }, count: 4 } ]
  let monthlyJobs = jobsPerMonth
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");
      return { date, count };
    })
    .reverse();
  return res.status(StatusCodes.OK).json({ defaultStats, monthlyJobs });
};

export { createJob, getAllJobs, getJob, deleteJob, updateJob, showStats };
