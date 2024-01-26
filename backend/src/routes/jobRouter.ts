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

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateParamId, getJob)
  .delete(validateParamId, deleteJob)
  .patch(validateParamId, validateJobInput, updateJob);

export default router;
