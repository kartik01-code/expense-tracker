import express from "express";
import { getMonthlySummary } from "../controllers/summaryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMonthlySummary);

export default router;
