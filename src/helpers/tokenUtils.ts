import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces";
import { BadRequestError } from "../errors/customErrors";

const createAccessJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "6m",
  });
  return token;
};

const createRefreshJWT = (payload: JwtPayload) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET_REFRESH_TOKEN as string,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "1d",
    }
  );
  return token;
};

const verifyJWT = (token: string, isRefreshToken = false) => {
  const secretKey = isRefreshToken
    ? process.env.JWT_SECRET_REFRESH_TOKEN
    : process.env.JWT_SECRET;
  if (!secretKey) {
    throw new BadRequestError("Missing secret key for token verification.");
  }
  return jwt.verify(token, secretKey as string) as JwtPayload;
};

export { createAccessJWT, createRefreshJWT, verifyJWT };
