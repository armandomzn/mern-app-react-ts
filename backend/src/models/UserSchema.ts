import mongoose from "mongoose";
import { IUser, USER_ROLE_ENUM } from "../interfaces";

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  userName: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE_ENUM),
    default: USER_ROLE_ENUM.USER,
  },
  avatar: String,
  avatarPublicId: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verified: {
    type: Date,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
