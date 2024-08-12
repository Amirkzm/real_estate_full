import express from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  getChat,
  getChats,
  createChat,
  readChat,
  recieveNewMessage,
} from "../controllers";
import { errorHandler } from "../utils/errorHandler";

const router = express.Router();

router.get("/", verifyToken, errorHandler(getChats));
router.get("/:id", verifyToken, errorHandler(getChat));
router.post("/", verifyToken, errorHandler(createChat));
router.put("/read/:id", verifyToken, errorHandler(readChat));
router.post("/new-message", verifyToken, errorHandler(recieveNewMessage));

export default router;
