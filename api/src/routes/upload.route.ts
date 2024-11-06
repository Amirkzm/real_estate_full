// src/routes/uploads.ts
import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { getFile } from "../controllers/upload.controller";
import { verifyToken } from "../middleware/verifyToken"; // Optional for protected access

const router = Router();

// Route to serve static files from 'uploads' folder
router.get("/:filename", verifyToken, errorHandler(getFile));

export default router;
