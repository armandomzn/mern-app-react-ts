import { GenericError } from "errors/customErrors";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: GenericError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    err.message ||
    err.errors ||
    "Sorry, something went wrong on the server side";
  return res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
