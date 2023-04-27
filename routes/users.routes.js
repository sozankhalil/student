import { Router } from "express";
import {
  getCurrentUser,
  getUser,
  login,
  signup,
} from "../controllers/user.controller.js";
import { protect, signUpMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getUser);
// .post(createUser);
router.route("/signup").post(signUpMiddleware, signup);
router.post("/login", login);
router.route("/currentuser").get(protect, getCurrentUser);

export default router;
