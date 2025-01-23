import fs from "fs";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { Response } from "express";
import { CustomRequest, JwtPayload } from "../interfaces";
import { JobSchema, TokenSchema, UserSchema } from "../models";
import { StatusCodes } from "http-status-codes";
import {
  REFRESH_TOKEN_EXPIRY_MS,
} from "../helpers/constants";
import {
  setAuthCookies,
  hashPassword,
  createRefreshJWT,
  createAccessJWT,
} from "../helpers";
import { BadRequestError } from "../errors/customErrors";

const getCurrentUser = async (req: CustomRequest, res: Response) => {
  const user = await UserSchema.findOne({ _id: req.user.userId });
  return res.status(StatusCodes.OK).json(user);
};

const getApplicationStats = async (req: CustomRequest, res: Response) => {
  const jobs = await JobSchema.countDocuments();
  const users = await UserSchema.countDocuments();
  return res.status(StatusCodes.OK).json({
    jobs,
    users,
  });
};

const updateUser = async (req: CustomRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (req.file) {
      // {
      //   fieldname: 'avatar',
      //   originalname: 'demo.jpg',
      //   encoding: '7bit',
      //   mimetype: 'image/jpeg',
      //   destination: 'public/uploads',
      //   filename: 'buttons.jpg',
      //   path: 'public\\uploads\\buttons.jpg',
      //   size: 86121
      // }
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      // we remove the uploaded image from public/uploads after we upload it in cloudinary
      await fs.promises.unlink(req.file.path);
      req.body.avatar = response.secure_url;
      req.body.avatarPublicId = response.public_id;
    }

    const user = await UserSchema.findByIdAndUpdate(req.user.userId, req.body);

    // If image exist in the current user that means that we are replacing the current image, we are not using the {new:true} options in findByIdAndUpdate method because we want the last reference to the user a not the new one to have access to the avatarPublicId property to properly delete the image from cloudinary
    if (req.file && user.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }

    // We recreate JWT
    const userPayload: JwtPayload = {
      userId: user._id,
      userName: user.userName,
      role: user.role,
    };

    const refreshTokenJWT = createRefreshJWT({
      userId: req.user.userId,
    });

    await TokenSchema.findOneAndUpdate(
      {
        user: user._id,
      },
      {
        refreshToken: refreshTokenJWT,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
      }
    );

    const accessTokenJWT = createAccessJWT(userPayload);

    setAuthCookies(res, accessTokenJWT, refreshTokenJWT);
    await session.commitTransaction();
    return res
      .status(StatusCodes.OK)
      .json({ message: "User Profile Updated Successfully" });
  } catch (error) {
    await session.abortTransaction();
    throw new BadRequestError("Failed transaction when updating user");
  } finally {
    await session.endSession();
  }
};

const deleteProfileImage = async (req: CustomRequest, res: Response) => {
  const deleteImageUserProfile = await UserSchema.findByIdAndUpdate(
    req.user.userId,
    { avatar: null, avatarPublicId: null }
  );
  if (deleteImageUserProfile.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(deleteImageUserProfile.avatarPublicId);
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Image Profile Deleted Successfully" });
};

const updateUserPassword = async (req: CustomRequest, res: Response) => {
  const hashedPassword = await hashPassword(req.body.newPasswordConfirm);
  req.body.password = hashedPassword;
  await UserSchema.findOneAndUpdate(
    { _id: req.user.userId },
    {
      password: req.body.password,
    }
  );
  return res.status(StatusCodes.OK).json({
    message: "User Password Updated Successfully",
  });
};

export {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  deleteProfileImage,
  updateUserPassword,
};
