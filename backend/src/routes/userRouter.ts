import { Router } from "express";
import {
  deleteProfileImage,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";
import {
  validateImageSize,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerMiddleware";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationStats);
router
  .route("/update-user")
  .patch(
    upload.single("avatar"),
    validateImageSize,
    checkForTestUser,
    validateUpdateUserInput,
    updateUser
  );
router.route("/delete-profile-image").delete(deleteProfileImage);

export default router;
