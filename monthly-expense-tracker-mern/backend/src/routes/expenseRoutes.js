import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

export default router;
