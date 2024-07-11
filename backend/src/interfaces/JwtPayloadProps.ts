import mongoose from "mongoose";

export interface JwtPayload {
  userId: mongoose.Types.ObjectId;
  userName: string;
  role: string;
  testUser?: boolean;
  refreshToken?: string;
}
