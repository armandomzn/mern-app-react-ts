import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";
import { validateUpdateUserInput } from "../middleware/validationMiddleware";
import { authorizePermissions } from "../middleware/authMiddleware";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
