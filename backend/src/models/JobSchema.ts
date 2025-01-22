import mongoose from "mongoose";
import { IJob, JOB_STATUS_ENUM, JOB_TYPE_ENUM } from "../interfaces";
import { JOB_STATUS, JOB_TYPE } from "../helpers";

const JobSchema = new mongoose.Schema<IJob>(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS_ENUM.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE_ENUM.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>("Job", JobSchema);
