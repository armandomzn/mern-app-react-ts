import mongoose from "mongoose";
import { TokenDocument } from "../interfaces";

const TokenSchema = new mongoose.Schema<TokenDocument>(
  {
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model<TokenDocument>("Token", TokenSchema);
export default TokenModel;
