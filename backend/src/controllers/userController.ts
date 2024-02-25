import { Response } from "express";
import fs from "fs";
import { CustomRequest } from "../interfaces/CustomRequestType";
import UserSchema from "../models/UserSchema";
import JobSchema from "../models/JobSchema";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

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

  const updatedUser = await UserSchema.findByIdAndUpdate(
    req.user.userId,
    req.body
  );

  // If image exist in the current user that means that we are replacing the current image, we are not using the {new:true} options in findByIdAndUpdate method because we want the last reference to the user a not the new one to have access to the avatarPublicId property to properly delete the image from cloudinary
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "User Profile Updated Successfully" });
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

export { getCurrentUser, getApplicationStats, updateUser, deleteProfileImage };
