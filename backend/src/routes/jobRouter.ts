import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobController";
import {
  validateJobInput,
  validateParamId,
} from "../middleware/validationMiddleware";
import { checkForTestUser } from "../middleware/authMiddleware";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router
  .route("/:id")
  .get(validateParamId, getJob)
  .delete(checkForTestUser, validateParamId, deleteJob)
  .patch(checkForTestUser, validateParamId, validateJobInput, updateJob);

export default router;
