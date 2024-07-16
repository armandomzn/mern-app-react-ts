import { Router } from "express";
import {
  deleteProfileImage,
  getApplicationStats,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";
import {
  validateImageSize,
  validateUpdateUserInput,
  validateUpdateUserPasswordInput,
} from "../middleware/validationMiddleware";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware";
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
router
  .route("/update-user-password")
  .patch(validateUpdateUserPasswordInput, updateUserPassword);

export default router;
