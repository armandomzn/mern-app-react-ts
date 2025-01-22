import { Document } from "mongoose";
import { USER_ROLE_ENUM } from "../interfaces";

export interface IUser extends Document {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  location: string;
  role: USER_ROLE_ENUM;
  avatar: string;
  avatarPublicId: string;
  isVerified: boolean;
  verificationToken: string;
  verified: Date;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
}
