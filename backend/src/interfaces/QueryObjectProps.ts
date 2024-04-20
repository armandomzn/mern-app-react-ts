import mongoose from "mongoose";

export interface QueryObjectProps {
  createdBy: mongoose.Types.ObjectId;
  $or?: {
    [key: string]: { $regex: string; $options: string };
  }[];
  jobStatus?: string;
  jobType?: string;
  sort?: string;
}
