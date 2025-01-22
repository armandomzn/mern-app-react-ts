export const VALIDATION_MESSAGES = {
  REQUIRED_PARAMETER_ID: "Id parameter is required",
  REQUIRED_USER_LENGTH: "userName must be at least 5 characters long",
  INVALID_AUTHORIZATION: {
    message: "Not authorized to access this route",
    errorType: "UnauthorizedError",
  },
  INVALID_EMAIL_FORMAT: "Invalid email format",
  INVALID_EMAIL: "Invalid email address",
  INVALID_CREDENTIALS: {
    message: "Invalid credentials",
    errorType: "UnauthenticatedError",
  },
  EMAIL_ALREADY_EXIST: "Email already exist",
  USERNAME_ALREADY_EXIST: "userName already exist",
  EMAIL_OR_USERNAME_IS_REQUIRED:
    "Either 'email' or 'userName' must be provided.",
  IMAGE_SIZE_LIMIT: "Size of image must be 500 KB (0.5M) or less",
  VERIFICATION_FAILED: "Verification failed",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  NEW_PASSWORD_SAME_AS_OLD:
    "The password must not be the same as the one used for.",
  NOT_FOUND: (resourceName: string, value: string) => {
    return {
      message: `No ${resourceName} with id ${value}`,
      errorType: "NotFoundError",
    };
  },
  REQUIRED_VALUE: (value: string) => {
    return `${value} is required`;
  },
  VALID_OPTIONS: (options: string[]) => {
    return `Valid options are: ${options.join(", ")}.`;
  },
  STRONG_PASSWORD: (passwordField: string) => {
    return `${passwordField} must be at least 8 characters long. At least one uppercase. At least one lower case. At least one special character.`;
  },
  INVALID_VALUE: (value: string, options?: string[]) => {
    return options
      ? `Invalid ${value} value. ${VALIDATION_MESSAGES.VALID_OPTIONS(options)}`
      : `Invalid ${value} value.`;
  },
  INVALID_MONGO_ID: (value: string) => {
    return `${value} is not valid MongoId`;
  },
  INVALID_MEDIA_FORMAT: (value: string) => {
    return `${value} field require and image of type .png, .jpg, .jpeg or .svg format.`;
  },
  MEDIA_NOT_PROVIDED: (value: string) => {
    return `Media not Provided in ${value} field`;
  },
};
