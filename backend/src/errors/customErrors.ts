import { StatusCodes } from "http-status-codes";

class GenericError extends Error {
  constructor(
    public readonly message: string,
    public readonly name: string,
    public readonly statusCode: number,
    public readonly errors?: string[]
  ) {
    super(message);
    this.errors = errors || [];
  }
}

class NotFoundError extends GenericError {
  constructor(message: string, errors?: string[]) {
    super(message, "NotFoundError", StatusCodes.NOT_FOUND, errors);
  }
}

class BadRequestError extends GenericError {
  constructor(message: string, errors?: string[]) {
    super(message, "BadRequestError", StatusCodes.BAD_REQUEST, errors);
  }
}

class UnauthenticatedError extends GenericError {
  constructor(message: string, errors?: string[]) {
    super(message, "UnauthenticatedError", StatusCodes.UNAUTHORIZED, errors);
  }
}

class UnauthorizedError extends GenericError {
  constructor(message: string, errors?: string[]) {
    super(message, "UnauthorizedError", StatusCodes.FORBIDDEN, errors);
  }
}

export {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  GenericError,
};
