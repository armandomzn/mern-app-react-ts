import { Response, NextFunction } from "express";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors";
import { verifyJWT } from "../helpers/tokenUtils";
import { JwtPayload } from "../interfaces/JwtPayloadProps";
import { CustomRequest } from "../interfaces/CustomRequestType";

const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError(`authentication invalid`);
  }
  try {
    const { userId, userName, role } = verifyJWT(token) as JwtPayload;
    const testUser = userId.toString() === "65d7d158fb173fc998d49247";
    req.user = {
      userId,
      role,
      userName,
      testUser,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

const authorizePermissions = (...rest: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!rest.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

const checkForTestUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User, Read Only!");
  }
  next();
};

export { authenticateUser, authorizePermissions, checkForTestUser };
