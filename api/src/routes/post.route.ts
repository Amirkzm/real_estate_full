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
import upload from "../middleware/multer";

const router = Router();

router.get("", errorHandler(getPosts));
router.get("/:id", errorHandler(getPost));
router.post("", verifyToken, upload.array("images"), errorHandler(createPost));
router.put(
  "/:id",
  verifyToken,
  upload.single("images"),
  errorHandler(updatePost)
);
router.delete("/:id", verifyToken, errorHandler(deletePost));

export default router;
