import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import jobRouter from "./routes/jobRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "./errors/customErrors";
import { authenticateUser } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";

const app = express();

// Third party middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// TODO: POSSIBLE DELETE
// let corsOptions = {
//   origin: ["http://localhost:5173"],
// };
// app.use(cors());


// Built-in middleware
app.use(cookieParser());
app.use(express.json());

// Router middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/user", authenticateUser, userRouter); //test routes

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ message: "works" });
});

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
