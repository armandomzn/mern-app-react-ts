import { NextFunction, Request, Response } from "express";

export type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;


