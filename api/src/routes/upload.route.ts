// src/routes/uploads.ts
import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { getFile } from "../controllers/upload.controller";

const router = Router();

// Route to serve static files from 'uploads' folder
router.get("/:filename", errorHandler(getFile));

export default router;
