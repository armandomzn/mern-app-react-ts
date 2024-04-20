import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JobSchema from "../models/JobSchema";
import mongoose from "mongoose";
import moment from "moment";
import {
  CustomRequest,
  StatProps,
  StatsProps,
  QueryObjectProps,
  SortOptions,
} from "../interfaces";
import { Pagination } from "../helpers/Pagination";

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
  //* We implement query params to filter search
  const { search, jobType, jobStatus, sort, page, limit } = req.query as {
    search?: string;
    jobType?: string;
    jobStatus?: string;
    sort?: SortOptions;
    page?: string;
    limit?: string;
  };
  //* We create queryObject to determine if some properties from req.query exist, if they exist then we added to queryObject to filter with find method, if not exist the search term will be empty and we return all jobs
  const queryObject: QueryObjectProps = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      {
        position: { $regex: search, $options: "i" },
      },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  //* Sort options
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey =
    (sortOptions as Record<SortOptions, string>)[sort] || sortOptions.newest;

  //* Pagination
  const totalJobs = await JobSchema.countDocuments(queryObject);
  const skipPages = ((Number(page) || 1) - 1) * (Number(limit) || 6);
  const jobs = await JobSchema.find(queryObject)
    .sort(sortKey)
    .skip(skipPages)
    .limit(Number(limit) || 6);
  // const numOfPages = Math.ceil(totalJobs / (Number(limit) || 6));
  const pagination = new Pagination(
    Number(page),
    Number(limit),
    totalJobs,
    jobs
  );
  return res.status(StatusCodes.OK).json({ ...pagination });
};

const showStats = async (req: CustomRequest, res: Response) => {
  //* Jobs grouped by jobStatus
  // [
  //   { _id: 'interview', count: 28 },
  //   { _id: 'pending', count: 41 },
  //   { _id: 'declined', count: 31 }
  // ]
  let stats: StatProps[] = await JobSchema.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  // We use reduce function to reformat the  aggregation function where the _id property contains the name of the jobStatus to result:
  // { interview: 28, pending: 41, declined: 31 }
  let newStats: StatsProps = stats.reduce((prev, current: StatProps) => {
    const { _id, count } = current;
    prev[_id] = count;
    return prev;
  }, {} as { [key: string]: number });
  // If some jobStatus does not exist in newStats then we assign a default of 0
  const defaultStats = {
    pending: newStats?.pending || 0,
    interview: newStats?.interview || 0,
    declined: newStats?.declined || 0,
  };
  //* We use another aggregate function to group the jobs by year and month and get the total count
  // [
  //   { _id: { year: 2025, month: 8 }, count: 2 },
  //   { _id: { year: 2025, month: 7 }, count: 4 },
  //   { _id: { year: 2025, month: 6 }, count: 6 },
  //   { _id: { year: 2025, month: 5 }, count: 3 },
  //   { _id: { year: 2025, month: 4 }, count: 5 },
  //   { _id: { year: 2025, month: 3 }, count: 6 }
  // ]
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
    ]);
  //* We use map function to reformat the jobsPerMonth array (month and year properties) with moment library the result format is e.x 'Mar 2025'
  // [
  //   { date: 'Mar 2025', count: 6 },
  //   { date: 'Apr 2025', count: 5 },
  //   { date: 'May 2025', count: 3 },
  //   { date: 'Jun 2025', count: 6 },
  //   { date: 'Jul 2025', count: 4 },
  //   { date: 'Aug 2025', count: 2 }
  // ]
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
