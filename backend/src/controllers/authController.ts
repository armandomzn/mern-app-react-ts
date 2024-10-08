import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors";
import crypto from "crypto";
import { TokenSchema, UserSchema } from "../models";
import { CustomRequest } from "../interfaces";
import {
  ACCESS_TOKEN_EXPIRY,
  PASSWORD_TEN_MINUTES_EXPIRY,
} from "../helpers/constants";
import {
  setAuthCookies,
  setCookie,
  createHashToken,
  hashPassword,
  comparePassword,
  sendResetPasswordEmail,
  sendResetSuccessPasswordEmail,
  sendVerificationEmail,
  createJWT,
} from "../helpers";

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

  // We create refreshToken, this will update the accessToken each time it expires
  let newRefreshToken = crypto.randomBytes(40).toString("hex");
  // We generate the main data for Token model
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  // The token expiration is oneDay
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  // We invalidate old tokens in Token schema
  await TokenSchema.deleteMany({ user: user._id });

  // Create token object
  await TokenSchema.create({
    userAgent,
    expiresAt,
    ip,
    refreshToken: newRefreshToken,
    user: user._id,
  });

  // We create the access token with duration of 5 minutes
  const accessTokenJWT = createJWT(
    {
      userId: user._id,
      userName: user.userName,
      role: user.role,
    },
    ACCESS_TOKEN_EXPIRY
  );

  // We create refreshToken with duration of oneDay by default, and we pass extra parameter which is the refreshToken
  const refreshTokenJWT = createJWT({
    userId: user._id,
    userName: user.userName,
    role: user.role,
    refreshToken: newRefreshToken,
  });
  // We create the cookies to store the accessToken and refreshToken, the authMiddleware check for each time you want to access a resource to use the access token or refresh it by generating a new one if necessary and extend the life of the token by deleting the old one.
  setAuthCookies(res, accessTokenJWT, refreshTokenJWT);
  return res.status(StatusCodes.OK).json({ message: "User Logged In" });
};

const logout = async (req: CustomRequest, res: Response) => {
  await TokenSchema.deleteMany({ user: req.user.userId });

  setCookie(res, "accessToken", "logout", { expires: new Date(Date.now()) });
  setCookie(res, "refreshToken", "logout", { expires: new Date(Date.now()) });

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

const forgotPassword = async (req: Request, res: Response) => {
  const user = await UserSchema.findOne({
    $or: [{ email: req.body.email }, { userName: req.body.userName }],
  });
  // If user exist then we send the email
  if (user) {
    const passwordToken = crypto.randomBytes(40).toString("hex");
    // send email to user
    const origin = req.headers.origin || "http://localhost:5173";
    await sendResetPasswordEmail(user.name, user.email, passwordToken, origin);

    // save data in UserSchema, this way the server will know which token validate and will check for password time expiration
    const passwordTokenExpirationDate = new Date(
      Date.now() + PASSWORD_TEN_MINUTES_EXPIRY
    );
    // We hash the passwordToken to be stored in the database
    user.passwordToken = createHashToken(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Please check your email for reset password link" });
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword, newPasswordConfirm } = req.body;
  const user = await UserSchema.findOne({ email });
  if (user) {
    const currentDate = new Date();
    // We recover the email token and we hash it (from url params) to be compared against the passwordToken from the database, if they are equal then we have the correct passwordToken.
    if (
      user.passwordTokenExpirationDate > currentDate &&
      user.passwordToken === createHashToken(token) &&
      newPassword === newPasswordConfirm
    ) {
      const hashedPassword = await hashPassword(newPasswordConfirm);
      user.password = hashedPassword;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
      await sendResetSuccessPasswordEmail(user.name, user.email);
    }
  }
  return res.status(StatusCodes.OK).json({ message: "Reset Password" });
};

export { register, login, logout, verifyEmail, forgotPassword, resetPassword };
