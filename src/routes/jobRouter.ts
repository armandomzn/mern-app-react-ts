import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  showStats,
  updateJob,
} from "../controllers/jobController";
import {
  validateJobInput,
  validateJobIdParam,
} from "../middleware/validationMiddleware";
import { checkForTestUser } from "../middleware/authMiddleware";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateJobIdParam, getJob)
  .delete(checkForTestUser, validateJobIdParam, deleteJob)
  .patch(checkForTestUser, validateJobIdParam, validateJobInput, updateJob);

export default router;
