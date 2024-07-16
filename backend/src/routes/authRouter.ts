import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validateRegisterInput,
  validateResetPassword,
  validateVerifyEmail,
} from "../middleware/validationMiddleware";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").delete(authenticateUser, logout);
router.route("/verify-email").post(validateVerifyEmail, verifyEmail);
router
  .route("/forgot-password")
  .post(validateForgotPasswordInput, forgotPassword);
router.route("/reset-password").post(validateResetPassword, resetPassword);

export default router;
