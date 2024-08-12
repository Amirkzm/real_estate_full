import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { verifyToken } from "../middleware/verifyToken";
import {
  deleteUser,
  getNotifications,
  getUser,
  getUsers,
  profilePosts,
  savePost,
  updateUser,
} from "../controllers";
import upload from "../middleware/multer";

const router = Router();

router.get("/", errorHandler(getUsers));
router.get("/profilePosts", verifyToken, errorHandler(profilePosts));
router.get("/:id/notifications", verifyToken, errorHandler(getNotifications));
router.get("/:id", verifyToken, errorHandler(getUser));
router.put(
  "/:id",
  verifyToken,
  upload.single("avatar"),
  errorHandler(updateUser)
);
router.post("/save-post", verifyToken, errorHandler(savePost));
router.delete("/save-post", verifyToken, errorHandler(savePost));
router.delete("/:id", verifyToken, errorHandler(deleteUser));

export default router;
