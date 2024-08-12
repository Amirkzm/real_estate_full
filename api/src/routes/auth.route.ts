import { Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { verifyToken } from "../middleware/verifyToken";
import {
  googleLogin,
  isAuthenticated,
  login,
  logout,
  register,
} from "../controllers";

const router = Router();

router.post("/google/verify", errorHandler(googleLogin));

router.get("/me", verifyToken, errorHandler(isAuthenticated));

router.post("/register", errorHandler(register));

router.post("/login", errorHandler(login));

router.post("/logout", errorHandler(logout));

export default router;
