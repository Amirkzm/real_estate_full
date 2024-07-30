import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { verifyToken } from "../middleware/verifyToken";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers";

const router = Router();

router.get("", errorHandler(getPosts));
router.get("/:id", errorHandler(getPost));
router.post("", verifyToken, errorHandler(createPost));
router.put("/:id", verifyToken, errorHandler(updatePost));
router.delete("/:id", verifyToken, errorHandler(deletePost));

export default router;
