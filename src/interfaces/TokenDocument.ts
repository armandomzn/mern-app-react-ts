import mongoose, { Document } from "mongoose";

export interface TokenDocument extends Document {
  userAgent: string;
  ip: string;
  refreshToken: string;
  expiresAt: Date;
  isValid: boolean;
  user: mongoose.Types.ObjectId;
}
