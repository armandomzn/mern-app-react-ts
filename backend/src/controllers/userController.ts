import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequestType";
import UserSchema from "../models/UserSchema";
import JobSchema from "../models/JobSchema";
import { StatusCodes } from "http-status-codes";

const getCurrentUser = async (req: CustomRequest, res: Response) => {
  const user = await UserSchema.findOne({ _id: req.user.userId });
  return res.status(StatusCodes.OK).json({ user });
};

const getApplicationStats = async (req: CustomRequest, res: Response) => {
  const jobs = await JobSchema.countDocuments();
  const users = await UserSchema.countDocuments();
  return res.status(StatusCodes.OK).json({
    jobs,
    users,
  });
};

const updateUser = async (req: CustomRequest, res: Response) => {
  await UserSchema.findByIdAndUpdate(req.user.userId, req.body);
  return res.status(StatusCodes.OK).json({ msg: "updated user" });
};

export { getCurrentUser, getApplicationStats, updateUser };
