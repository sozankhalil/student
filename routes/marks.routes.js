import { Router } from "express";
import { createMark, getMarks } from "../controllers/marks.controller.js";

const router = Router();

router.route("/").get(getMarks).post(createMark);

export default router;
