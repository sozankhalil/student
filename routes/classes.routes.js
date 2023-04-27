import { Router } from "express";
import {
  createClass,
  getClasses,
  registerClass,
} from "../controllers/classes.controller.js";

const router = Router();

router.route("/").post(createClass).get(getClasses);
router.route("/registerClass/:classId").patch(registerClass);

export default router;
