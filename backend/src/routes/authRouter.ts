import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/authController";
import {
  validateLoginInput,
  validateRegisterInput,
  validateVerifyEmail,
} from "../middleware/validationMiddleware";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").delete(authenticateUser, logout);
router.route("/verify-email").post(validateVerifyEmail, verifyEmail);

export default router;
