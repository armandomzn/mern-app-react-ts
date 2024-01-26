import { Router } from "express";
import { login, logout, register } from "../controllers/authController";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware";

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").get(logout);

export default router;
