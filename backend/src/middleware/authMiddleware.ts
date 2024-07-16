import { Response, NextFunction } from "express";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors";
import crypto from "crypto";
import { createJWT, verifyJWT } from "../helpers/tokenUtils";
import { JwtPayload, CustomRequest } from "../interfaces";
import { TokenSchema } from "../models";

import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
} from "../helpers/constants";
import { setAuthCookies } from "../helpers/cookieUtils";

const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.signedCookies;
  if (!accessToken && !refreshToken) {
    throw new UnauthenticatedError(`Authentication invalid`);
  }
  try {
    // If accessToken exist then that means we don't need the refreshToken for the moment and that cookie is still valid on the server
    if (accessToken) {
      const { userId, userName, role } = verifyJWT(accessToken) as JwtPayload;
      req.user = {
        userId,
        role,
        userName,
        testUser: userId.toString() === "65d7d158fb173fc998d49247",
      };
      return next();
    }
    // If accessToken doesn't exist we need to rotate the refreshToken by creating a new one and delete the old one or obsolete one, this restarts the token cycle in the cookies and the session duration is extended
    const payload = verifyJWT(refreshToken) as JwtPayload;
    const existingToken = await TokenSchema.findOne({
      user: payload.userId,
      refreshToken: payload.refreshToken,
    });

    // The isValid property is overridden by the database administrator in case the token or refreshToken has been compromised.
    if (
      !existingToken ||
      !existingToken.isValid ||
      existingToken.expiresAt < new Date()
    ) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    const newRefreshToken = crypto.randomBytes(40).toString("hex");
    existingToken.refreshToken = newRefreshToken;
    existingToken.expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
    await existingToken.save();

    // We create the access token with duration of 5 minutes
    const accessTokenJWT = createJWT(
      {
        userId: payload.userId,
        userName: payload.userName,
        role: payload.role,
      },
      ACCESS_TOKEN_EXPIRY
    );

    // We create refreshToken with duration of oneDay by default, and we pass extra parameter which is the refreshToken
    const refreshTokenJWT = createJWT({
      userId: payload.userId,
      userName: payload.userName,
      role: payload.role,
      refreshToken: newRefreshToken,
    });
    // We create the cookie to store the accessToken and refreshToken
    setAuthCookies(res, accessTokenJWT, refreshTokenJWT);

    req.user = {
      userId: payload.userId,
      role: payload.role,
      userName: payload.userName,
      testUser: payload.userId.toString() === "65d7d158fb173fc998d49247",
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
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
