import express from "express";
import { getBudget, upsertBudget } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBudget);
router.put("/", upsertBudget);

export default router;
