import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JobSchema from "../models/JobSchema";
import { CustomRequest } from "../interfaces/CustomRequestType";

const createJob = async (req: CustomRequest, res: Response) => {
  // We add to the body request the user who is creating the actual job, this information is obtained from the token 
  req.body.createdBy = req.user.userId;
  const job = await JobSchema.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
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
    .json({ message: "job deleted", removedJob });
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
    .json({ message: "job updated", updatedJob });
};

const getAllJobs = async (req: CustomRequest, res: Response) => {
  const jobs = await JobSchema.find({ createdBy: req.user.userId });
  return res.status(StatusCodes.OK).json({ jobs });
};

export { createJob, getAllJobs, getJob, deleteJob, updateJob };
