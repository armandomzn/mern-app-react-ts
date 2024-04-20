import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces";

const createJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const verifyJWT = (token: string) => {
  const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
  return isValidToken;
};

export { createJWT, verifyJWT };
