import { Request, Response } from "express";
import UserSchema from "../models/UserSchema";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../helpers/passwordUtils";
import { UnauthenticatedError } from "../errors/customErrors";
import { createJWT } from "../helpers/tokenUtils";

const register = async (req: Request, res: Response) => {
  const userCount = await UserSchema.countDocuments();
  if (userCount === 0) {
    req.body.role = "admin";
  }
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await UserSchema.create(req.body);
  return res.status(StatusCodes.CREATED).json({ message: "User Created" });
};

const login = async (req: Request, res: Response) => {
  // We receive email or password
  const user = await UserSchema.findOne({
    $or: [{ email: req.body.email }, { userName: req.body.userName }],
  }).select("+password");

  // If user does not exist we send 401 error
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // We compare password provided by the current user and hashed password from existing user in the database, if both are correct then we authenticated user sending json web token and creating cookie
  const isPasswordValid = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // We create the token
  const token = createJWT({
    userId: user._id,
    userName: user.userName,
    role: user.role,
  });
  // We create the cookie to store the token
  res.cookie("token", token, {
    httpOnly: true, //a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // time in milliseconds, 1day
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(StatusCodes.OK).json({ message: "User Logged In" });
};

const logout = (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(StatusCodes.OK).json({ message: "User Logged Out" });
};

export { register, login, logout };
