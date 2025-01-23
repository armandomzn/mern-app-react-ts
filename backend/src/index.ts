import "dotenv/config";
import "express-async-errors";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import express, { NextFunction, Request, Response } from "express";
import jobRouter from "./routes/jobRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "./errors/customErrors";
import { authenticateUser } from "./middleware/authMiddleware";
import "./helpers/cronExpirationForgetPasswordToken";

const app = express();

// Third party middleware
app.use(cookieParser(process.env.COOKIES_SECRET));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}
// Cloudinary middleware for image upload profile
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Built-in middleware
// We use the static middleware to load static files (in this case the images that the Profile component from client app uses to load an profile image using the multer middleware) from public folder
app.use(express.json());
app.use(express.static(path.resolve(__dirname, path.join("public"))));

// Router middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/user", authenticateUser, userRouter);

// app.get("*", (req, res) => {
//   return res.send(path.resolve(__dirname, "./public", "index.html"));
// });

// express-validator example
app.post(
  "/api/v1/test",
  [
    body("name").notEmpty().withMessage(" name is required "),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsMessages: string[] = errors
          .array()
          .map((error) => error.msg);
        throw new BadRequestError("", errorsMessages);
      }
      next();
    },
  ],
  (req: Request, res: Response) => {
    return res.status(200).json({ msg: "works" });
  }
);

// When the route we are looking for is not found in the routes previously defined in the router middleware, then any request we are making will fall into this route showing not found
app.use("*", (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
});

// Error handler middleware, this will manage the NotFound when the id of some element is not found for example, BadRequest, Unauthenticated, Unauthorized errors classes which derive from GenericError which derive from Error class from javascript
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
