import mongoose, { Document } from "mongoose";
import { JOB_STATUS_ENUM, JOB_TYPE_ENUM } from "../interfaces";

export interface IJob extends Document {
  company: string;
  position: string;
  jobStatus: JOB_STATUS_ENUM;
  jobType: JOB_TYPE_ENUM;
  jobLocation: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
