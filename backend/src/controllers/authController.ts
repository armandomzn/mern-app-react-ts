import { Request, Response } from "express";
import UserSchema from "../models/UserSchema";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../helpers/passwordUtils";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors";
import crypto from "crypto";
import { createJWT } from "../helpers/tokenUtils";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";

const register = async (req: Request, res: Response) => {
  const userCount = await UserSchema.countDocuments();
  if (userCount === 0) {
    req.body.role = "admin";
  }
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  // We create verificationToken to confirm the user account by mail
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await UserSchema.create({
    ...req.body,
    verificationToken,
  });
  const origin = req.headers.origin || "http://localhost:5173";
  await sendVerificationEmail({
    origin,
    name: user.name,
    email: user.email,
    verificationToken,
  });
  return res.status(StatusCodes.CREATED).json({
    message: "User Created! Please check your email to verify the account",
  });
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

  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your email");
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

const verifyEmail = async (req: Request, res: Response) => {
  const {
    verificationToken,
    email,
  }: {
    verificationToken: string;
    email: string;
  } = req.body;

  const user = await UserSchema.findOne({ email });

  if (user.isVerified) {
    throw new BadRequestError("Email Already Verified");
  }

  if (verificationToken !== user.verificationToken) {
    throw new UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verified = new Date();
  user.verificationToken = "";

  await user.save();
  return res.status(StatusCodes.OK).json({ message: "Email Verified" });
};

export { register, login, logout, verifyEmail };
