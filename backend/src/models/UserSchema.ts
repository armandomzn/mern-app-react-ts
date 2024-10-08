import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    enum: ["admin", "user"],
    default: "user",
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

export default mongoose.model("User", UserSchema);
