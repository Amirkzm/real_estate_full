import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { login, logout, register } from "../controllers";

const router = Router();

router.post("/register", errorHandler(register));

router.post("/login", errorHandler(login));

router.post("/logout", errorHandler(logout));

export default router;
