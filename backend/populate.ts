import "dotenv/config";
import mongoose from "mongoose";
import UserSchema from "./src/models/UserSchema";
import JobSchema from "./src/models/JobSchema";
import { readFile } from "fs/promises";

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    const user = (await UserSchema.findOne({
      _id: "65d7d158fb173fc998d49247",
    })) as mongoose.Document;
    const seedJobs = JSON.parse(
      await readFile(`${__dirname}/src/helpers/seedData.json`, {
        encoding: "utf-8",
      })
    );
    const jobs = seedJobs.map(
      (job: {
        company: string;
        position: string;
        jobLocation: string;
        jobStatus: string;
        jobType: string;
        createdAt: string;
      }) => {
        return {
          ...job,
          createdBy: user._id,
        };
      }
    );
    await JobSchema.deleteMany({ createdBy: user._id });
    await JobSchema.create(jobs);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
