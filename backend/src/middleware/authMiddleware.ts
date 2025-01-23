import mongoose from "mongoose";
import { Response, NextFunction } from "express";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors";
import { JwtPayload, CustomRequest, TokenDocument } from "../interfaces";
import { TokenSchema, UserSchema } from "../models";
import {
  REFRESH_TOKEN_EXPIRY_MS,
  setAuthCookies,
  createAccessJWT,
  createRefreshJWT,
  verifyJWT,
  clearCookies,
} from "../helpers";

const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { ACCESS_TOKEN, REFRESH_TOKEN } = req.signedCookies;
  if (!ACCESS_TOKEN && !REFRESH_TOKEN) {
    throw new UnauthenticatedError(`Authentication invalid`);
  }
  try {
    // If accessToken exist then that means we don't need the refreshToken for the moment and that cookie is still valid on the server
    if (ACCESS_TOKEN) {
      const { userId, userName, role } = verifyJWT(ACCESS_TOKEN) as JwtPayload;
      req.user = {
        userId,
        role,
        userName,
        testUser: userId.toString() === "65d7d158fb173fc998d49247",
      };
      return next();
    }
    // If accessToken doesn't exist we need to rotate the refreshToken by creating a new one and delete the old one or obsolete one, this restarts the token cycle in the cookies and the session duration is extended
    const payload = verifyJWT(REFRESH_TOKEN, true) as JwtPayload;
    const isRefreshingToken = await TokenSchema.findOne({
      user: payload.userId,
      refreshToken: REFRESH_TOKEN,
    });
    const user = await UserSchema.findById(payload.userId);

    if (!isRefreshingToken) {
      await TokenSchema.deleteOne({
        user: payload.userId,
        refreshToken: REFRESH_TOKEN,
      });
      clearCookies(res);
      throw new UnauthorizedError("Invalid refresh token");
    }

    // The isValid property is overridden by the database administrator in case the token or refreshToken has been compromised.
    if (
      !isRefreshingToken.isValid ||
      isRefreshingToken.expiresAt < new Date()
    ) {
      await TokenSchema.deleteOne({
        user: payload.userId,
        refreshToken: REFRESH_TOKEN,
      });
      clearCookies(res);
      throw new UnauthenticatedError("Authentication Invalid");
    }

    const { accessTokenJWT, refreshTokenJWT } = await rotateRefreshToken(
      isRefreshingToken,
      payload
    );

    // We create the cookie to store the accessToken and refreshToken
    setAuthCookies(res, accessTokenJWT, refreshTokenJWT);

    req.user = {
      userId: payload.userId,
      role: user.role,
      userName: user.userName,
      testUser: user._id.toString() === "65d7d158fb173fc998d49247",
    };

    return next();
  } catch (error) {
    if (req.user.userId && REFRESH_TOKEN) {
      await TokenSchema.deleteOne({
        user: req.user.userId,
        refreshToken: REFRESH_TOKEN,
      });
      clearCookies(res);
    }
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

const rotateRefreshToken = async (
  existingToken: TokenDocument,
  payload: JwtPayload
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // We save a new refreshToken for the user which is going to match with the current Token refreshToken
    const refreshTokenJWT = createRefreshJWT({
      userId: payload.userId,
    });
    existingToken.refreshToken = refreshTokenJWT;
    existingToken.expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
    await existingToken.save();

    const user = await UserSchema.findById(payload.userId);

    const accessTokenJWT = createAccessJWT({
      userId: user._id,
      userName: user.userName,
      role: user.role,
    });
    await session.commitTransaction();
    return { accessTokenJWT, refreshTokenJWT };
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

export { authenticateUser, authorizePermissions, checkForTestUser };
