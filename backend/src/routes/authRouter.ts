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

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").get(logout);
router.route("/verify-email").post(validateVerifyEmail, verifyEmail);

export default router;
