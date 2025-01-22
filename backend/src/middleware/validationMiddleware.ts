import multer from "multer";
import mongoose from "mongoose";
import { Errback, NextFunction, Request, Response } from "express";
import { JobSchema, UserSchema } from "../models";
import { ValidationMiddleware, CustomRequest } from "../interfaces";
import {
  ValidationChain,
  body,
  param,
  validationResult,
} from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors";
import {
  comparePassword,
  VALIDATION_MESSAGES,
  JOB_STATUS,
  JOB_TYPE,
} from "../helpers";

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
        let errorType: string;
        const errorMessages = errors.array().map((err) => {
          if (err.msg.errorType) {
            errorType = err.msg.errorType;
          }
          const message = err.msg?.message || err.msg;
          return message;
        });
        // The default error message is BadRequest, but other types of errors are thrown if necessary.
        if (errorType) {
          delete errorMessages[0].errorType;
        }
        if (errorType && errorType === "UnauthorizedError") {
          return next(new UnauthorizedError("", errorMessages));
        }
        if (errorType && errorType === "NotFoundError") {
          return next(new NotFoundError("", errorMessages));
        }
        if (errorType && errorType === "UnauthenticatedError") {
          return next(new UnauthenticatedError("", errorMessages));
        }
        return next(new BadRequestError("", errorMessages));
      }
      next();
    },
  ];
};

const validateField = (field: string, message: string) => {
  return body(field).notEmpty().withMessage(message);
};

// This middleware validate the user input when delete, update or get job using a mongo db id parameter
const validateParamId = <T extends mongoose.Document>(
  model: mongoose.Model<T>,
  userField: string,
  resourceName: string
) => {
  return param("id")
    .exists()
    .withMessage(VALIDATION_MESSAGES.REQUIRED_PARAMETER_ID)
    .custom(async (value, { req }) => {
      // This will check if mongodb id is valid
      const isValidMongoId = mongoose.isValidObjectId(value);
      if (!isValidMongoId) {
        return Promise.reject(VALIDATION_MESSAGES.INVALID_MONGO_ID(value));
      }
      // This will check if job exist
      const query = model.findById(value);
      if (userField) {
        query.select(`+${userField}`);
      }
      const document = await query;
      if (!document) {
        return Promise.reject(
          VALIDATION_MESSAGES.NOT_FOUND(resourceName, value)
        );
      }
      // This will check if the user is the owner or job
      const request = req as CustomRequest;
      const isAdmin = request.user.role === "admin";
      const isOwner =
        request.user.userId.toString() ===
        document[userField as keyof T].toString();
      // If is not admin then true, so the admin can see the job from other users and if is not the owner of the job then true
      if (!isAdmin && !isOwner) {
        return Promise.reject(VALIDATION_MESSAGES.INVALID_AUTHORIZATION);
      }
    });
};

const validatePasswordInput = (
  field: string,
  fieldMessage: string,
  strongPasswordMessage: string
) => {
  return validateField(field, fieldMessage)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(strongPasswordMessage);
};

const checkUserExists = async <T extends mongoose.Document>(
  model: mongoose.Model<T>,
  schemaSearch: mongoose.FilterQuery<T>,
  validationMessage: string
) => {
  const document = await model.findOne(schemaSearch);
  if (document) {
    return Promise.reject(validationMessage);
  }
  return Promise.resolve(true);
};

const validateImage = (inputName: string, optionalChaining = false) => {
  return withValidationErrors([
    body(inputName).custom((_, { req }) => {
      if (!req.file && !optionalChaining) {
        return Promise.reject(
          VALIDATION_MESSAGES.MEDIA_NOT_PROVIDED(inputName)
        );
      }
      if (
        req.file &&
        !["image/png", "image/jpg", "image/jpeg", "image/svg+xml"].includes(
          req.file.mimetype
        )
      ) {
        return Promise.reject(
          VALIDATION_MESSAGES.INVALID_MEDIA_FORMAT(inputName)
        );
      }
      return Promise.resolve(true);
    }),
  ]);
};

const validateAtLeastOneField = (fields: string[], errorMessage: string) => {
  return body().custom((_, { req }) => {
    const missingFields = fields.every((field) => !req.body[field]);
    if (missingFields) {
      return Promise.reject(errorMessage);
    }
    return Promise.resolve(true);
  });
};

const validatePasswordsMatch = (value: string, req: Request) => {
  if (req.body.newPassword !== value) {
    return Promise.reject(VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }
  return Promise.resolve(true);
};

const validateJobIdParam = withValidationErrors([
  validateParamId(JobSchema, "createdBy", "job"),
]);

// This middleware validate the user input when create and update a job
const validateJobInput = withValidationErrors([
  validateField("company", VALIDATION_MESSAGES.REQUIRED_VALUE("Company")),
  validateField("position", VALIDATION_MESSAGES.REQUIRED_VALUE("Position")),
  validateField(
    "jobLocation",
    VALIDATION_MESSAGES.REQUIRED_VALUE("jobLocation")
  ),
  validateField("jobStatus", VALIDATION_MESSAGES.REQUIRED_VALUE("jobStatus"))
    .isIn(Object.values(JOB_STATUS))
    .withMessage(
      VALIDATION_MESSAGES.INVALID_VALUE("job status", Object.values(JOB_STATUS))
    ),
  validateField("jobType", VALIDATION_MESSAGES.REQUIRED_VALUE("jobType"))
    .isIn(Object.values(JOB_TYPE))
    .withMessage(
      VALIDATION_MESSAGES.INVALID_VALUE("job type", Object.values(JOB_TYPE))
    ),
]);

// This middleware validate the user input (request body) when register user
const validateRegisterInput = withValidationErrors([
  validateField("name", VALIDATION_MESSAGES.REQUIRED_VALUE("Name")),
  validateField("lastName", VALIDATION_MESSAGES.REQUIRED_VALUE("LastName")),
  validateField("location", VALIDATION_MESSAGES.REQUIRED_VALUE("Location")),
  validateField("email", VALIDATION_MESSAGES.REQUIRED_VALUE("Email"))
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT)
    .custom(async (email) => {
      return checkUserExists(
        UserSchema,
        { email },
        VALIDATION_MESSAGES.EMAIL_ALREADY_EXIST
      );
    }),
  validateField("userName", VALIDATION_MESSAGES.REQUIRED_VALUE("userName"))
    .isLength({ min: 5 })
    .withMessage(VALIDATION_MESSAGES.REQUIRED_USER_LENGTH)
    .isLowercase()
    .withMessage(" userName must be lowercase ")
    .custom(async (userName) => {
      return checkUserExists(
        UserSchema,
        { userName },
        VALIDATION_MESSAGES.USERNAME_ALREADY_EXIST
      );
    }),
  validatePasswordInput(
    "password",
    VALIDATION_MESSAGES.REQUIRED_VALUE("Password"),
    VALIDATION_MESSAGES.STRONG_PASSWORD("Password")
  ),
]);

// This middleware will validate the user login request body
const validateLoginInput = withValidationErrors([
  body("email")
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.INVALID_EMAIL)
    .optional(),
  body("userName")
    .isLength({ min: 5 })
    .withMessage(VALIDATION_MESSAGES.REQUIRED_USER_LENGTH)
    .optional(),
  validateField("password", VALIDATION_MESSAGES.REQUIRED_VALUE("Password")),
  validateAtLeastOneField(
    ["email", "userName"],
    VALIDATION_MESSAGES.EMAIL_OR_USERNAME_IS_REQUIRED
  ),
]);

const validateUpdateUserInput = withValidationErrors([
  validateField("name", VALIDATION_MESSAGES.REQUIRED_VALUE("Name")),
  validateField("lastName", VALIDATION_MESSAGES.REQUIRED_VALUE("LastName")),
  validateField("location", VALIDATION_MESSAGES.REQUIRED_VALUE("Location")),
]);

const validateImageSize = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    throw new BadRequestError(VALIDATION_MESSAGES.IMAGE_SIZE_LIMIT);
  }
  // This will catch the "Only images are allowed" BadRequestError
  if (err) {
    return next(err);
  }
  next();
};

const validateProfileParamId = withValidationErrors([
  validateParamId(UserSchema, undefined, "user"),
]);

const validateVerifyEmail = withValidationErrors([
  validateField("email", VALIDATION_MESSAGES.REQUIRED_VALUE("Email"))
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT)
    .custom(async (email, { req }) => {
      const user = await UserSchema.findOne({ email });
      if (!user) {
        return Promise.reject(VALIDATION_MESSAGES.VERIFICATION_FAILED);
      }
      return Promise.resolve(true);
    }),
  validateField(
    "verificationToken",
    VALIDATION_MESSAGES.REQUIRED_VALUE("Verification token")
  ),
]);

const validateForgotPasswordInput = withValidationErrors([
  body("email")
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT)
    .optional(),
  body("userName")
    .isLength({ min: 5 })
    .withMessage(VALIDATION_MESSAGES.REQUIRED_USER_LENGTH)
    .optional(),
  validateAtLeastOneField(
    ["email", "userName"],
    VALIDATION_MESSAGES.EMAIL_OR_USERNAME_IS_REQUIRED
  ),
]);

const validateResetPassword = withValidationErrors([
  validateField("email", VALIDATION_MESSAGES.REQUIRED_VALUE("Email"))
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT),
  validateField("token", VALIDATION_MESSAGES.REQUIRED_VALUE("Token")),
  validatePasswordInput(
    "newPassword",
    VALIDATION_MESSAGES.REQUIRED_VALUE("New password"),
    VALIDATION_MESSAGES.STRONG_PASSWORD("New password")
  ),
  validatePasswordInput(
    "newPasswordConfirm",
    VALIDATION_MESSAGES.REQUIRED_VALUE("New password confirm"),
    VALIDATION_MESSAGES.STRONG_PASSWORD("New password confirm")
  ).custom((value, { req }) => {
    return validatePasswordsMatch(value, req as Request);
  }),
]);

const validateUpdateUserPasswordInput = withValidationErrors([
  validateField(
    "oldPassword",
    VALIDATION_MESSAGES.REQUIRED_VALUE("Current password")
  ).custom(async (value, { req }) => {
    const request = req as CustomRequest;
    const user = await UserSchema.findOne({
      _id: request.user.userId,
    }).select("+password");
    const isPasswordCorrect = await comparePassword(
      value,
      user.password.toString()
    );
    if (!isPasswordCorrect) {
      return Promise.reject(VALIDATION_MESSAGES.INVALID_CREDENTIALS);
    }
  }),

  validatePasswordInput(
    "newPassword",
    VALIDATION_MESSAGES.REQUIRED_VALUE("New password"),
    VALIDATION_MESSAGES.STRONG_PASSWORD("New password")
  ).custom(async (value, { req }) => {
    const request = req as CustomRequest;
    if (request.body.oldPassword === value) {
      return Promise.reject(VALIDATION_MESSAGES.NEW_PASSWORD_SAME_AS_OLD);
    }
    return Promise.resolve(true);
  }),
  validatePasswordInput(
    "newPasswordConfirm",
    VALIDATION_MESSAGES.REQUIRED_VALUE("New password confirm"),
    VALIDATION_MESSAGES.STRONG_PASSWORD("New password confirm")
  ).custom(async (value, { req }) => {
    return validatePasswordsMatch(value, req as Request);
  }),
]);

export {
  validateJobInput,
  validateJobIdParam,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
  validateImageSize,
  validateProfileParamId,
  validateVerifyEmail,
  validateForgotPasswordInput,
  validateResetPassword,
  validateUpdateUserPasswordInput,
  validateImage,
};
