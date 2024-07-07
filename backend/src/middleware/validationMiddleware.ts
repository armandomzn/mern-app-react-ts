import { Errback, NextFunction, Request, Response } from "express";
import {
  ValidationChain,
  body,
  param,
  validationResult,
} from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../helpers/constants";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors";
import mongoose from "mongoose";
import JobSchema from "../models/JobSchema";
import UserSchema from "../models/UserSchema";
import { ValidationMiddleware, CustomRequest } from "../interfaces";
import multer from "multer";

// This middleware function will validate the user body request using express-validator, if there are errors we are going to throw customizing errors from customErrors that will be catch it by the errorHandlerMiddleware file
const withValidationErrors = (
  validateValues: ValidationChain[]
): ValidationMiddleware[] => {
  return [
    // Validation Middleware from express-validator
    ...validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors.array().map((err) => err.msg);
        // When we search id that does not exist we throw by default BadRequestError that's why in this line we search if message startsWith, then we throw the corresponding not found error
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError("", errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("", errorMessages);
        }
        throw new BadRequestError("", errorMessages);
      }
      next();
    },
  ];
};

// This middleware validate the user input when create and update a job
const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage(" company is required "),
  body("position").notEmpty().withMessage(" position is required "),
  body("jobLocation").notEmpty().withMessage(" jobLocation is required "),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage(" invalid job status value "),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage(" invalid job type value "),
]);

// This middleware validate the user input when delete, update or get job using a mongo db id parameter
const validateParamId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    // This will check if mongodb id is valid
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) {
      throw new BadRequestError(`invalid MongoDB id: ${value}`);
    }
    // This will check if job exist
    const job = await JobSchema.findById(value).select("+createdBy");
    if (!job) {
      throw new NotFoundError(`no job with id ${value}`);
    }

    // This will check if the user is the owner or job
    const request = req as CustomRequest;
    const isAdmin = request.user.role === "admin";
    const isOwner = request.user.userId.toString() === job.createdBy.toString();
    // If is not admin then true, so the admin can see the job from other users
    // If is not the owner of the job then true
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
  }),
]);

// This middleware validate the user input (request body) when register user
const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage(" Name is required "),
  body("lastName").notEmpty().withMessage(" LastName is required "),
  body("location").notEmpty().withMessage(" Location is required "),
  body("email")
    .notEmpty()
    .withMessage(" Email is required ")
    .isEmail()
    .withMessage(" Invalid email format ")

    .custom(async (email) => {
      const user = await UserSchema.findOne({ email });
      if (user) {
        throw new BadRequestError(" Email already exist ");
      }
    }),
  body("userName")
    .notEmpty()
    .withMessage(" userName is required ")
    .isLength({ min: 5 })
    .withMessage(" userName must be at least 5 characters long ")
    .isLowercase()
    .withMessage(" userName must be lowercase ")
    .custom(async (userName) => {
      const user = await UserSchema.findOne({ userName });
      if (user) {
        throw new BadRequestError(" userName already exist ");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage(" Password is required ")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      " Password must be at least 8 characters long. At least one uppercase. At least one lower case. At least one special character. "
    ),
]);

// This middleware will validate the user login request body
const validateLoginInput = withValidationErrors([
  body("email").isEmail().withMessage(" Invalid email address ").optional(),
  body("userName")
    .isLength({ min: 5 })
    .withMessage(" userName min length must be of 5 ")
    .optional(),
  body("password").notEmpty().withMessage(" Password is required "),
]);

const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage(" Name is required "),
  body("lastName").notEmpty().withMessage(" LastName is required "),
  body("location").notEmpty().withMessage(" Location is required "),
  // body("email")
  //   .notEmpty()
  //   .withMessage(" Email is required ")
  //   .isEmail()
  //   .withMessage(" Invalid email format ")
  //   .custom(async (email, { req }) => {
  //     const user = await UserSchema.findOne({ email });
  //     const request = req as CustomRequest;
  //     // We check if the email exist and the current user is different to the owner of email if is the case then the current user is not the owner of the email
  //     if (user && request.user.userId.toString() !== user._id.toString()) {
  //       throw new BadRequestError(" Email already exist ");
  //     }
  //   }),
  // body("userName")
  //   .notEmpty()
  //   .withMessage(" userName is required ")
  //   .isLength({ min: 5 })
  //   .withMessage(" userName must be at least 5 characters long ")
  //   .isLowercase()
  //   .withMessage(" userName must be lowercase ")
  //   .custom(async (userName, { req }) => {
  //     const user = await UserSchema.findOne({ userName });
  //     const request = req as CustomRequest;
  //     // We check if the userName exist and the current user is different to the owner of userName if is the case then the current user is not the owner of the userName
  //     if (user && request.user.userId.toString() !== user._id.toString()) {
  //       throw new BadRequestError(" userName already exist ");
  //     }
  //   }),
  body("avatar")
    .optional()
    .custom((value, { req }) => {
      if (
        !["image/png", "image/jpg", "image/jpeg", "image/svg+xml"].includes(
          req.file.mimetype
        )
      ) {
        throw new BadRequestError(
          " avatar field required and image of type .png, .jpg, .jpeg or .svg format "
        );
      }
      return true;
    }),
]);

const validateImageSize = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    throw new BadRequestError("Size of image must be 500 KB (0.5M) or less");
  }
  next();
};

const validateProfileParamId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    // This will check if mongodb id is valid
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) {
      throw new BadRequestError(`invalid MongoDB id: ${value}`);
    }
    // This will check if user exist
    const user = await UserSchema.findById(value);
    if (!user) {
      throw new NotFoundError(`no user with id ${value}`);
    }

    // This will check if the user is the owner or job
    const request = req as CustomRequest;
    const isAdmin = request.user.role === "admin";
    const isOwner = request.user.userId.toString() === user._id.toString();
    // If is not admin then true, so the admin can see the job from other users
    // If is not the owner of the job then true
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
  }),
]);

const validateVerifyEmail = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage(" Email is required ")
    .isEmail()
    .withMessage(" Invalid email format ")
    .custom(async (email, { req }) => {
      const user = await UserSchema.findOne({ email });
      if (!user) {
        throw new BadRequestError(" Verification Failed ");
      }
    }),
  body("verificationToken")
    .notEmpty()
    .withMessage(" verificationToken is required "),
]);

export {
  validateJobInput,
  validateParamId,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
  validateImageSize,
  validateProfileParamId,
  validateVerifyEmail,
};
