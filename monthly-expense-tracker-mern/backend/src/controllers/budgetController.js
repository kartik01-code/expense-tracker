import { z } from "zod";
import Budget from "../models/Budget.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { normalizeMonth } from "../utils/month.js";

const budgetSchema = z.object({
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be in YYYY-MM format"),
  amount: z.coerce.number().min(0, "Budget amount cannot be negative"),
  categoryLimits: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Category name is required"),
        limit: z.coerce.number().min(0, "Category limit cannot be negative")
      })
    )
    .optional()
    .default([])
});

export const getBudget = asyncHandler(async (req, res) => {
  const month = normalizeMonth(req.query.month);

  let budget = await Budget.findOne({
    user: req.user._id,
    month
  });

  if (!budget) {
    budget = {
      user: req.user._id,
      month,
      amount: 0,
      categoryLimits: []
    };
  }

  res.json({
    success: true,
    budget
  });
});

export const upsertBudget = asyncHandler(async (req, res) => {
  const data = budgetSchema.parse(req.body);

  const budget = await Budget.findOneAndUpdate(
    {
      user: req.user._id,
      month: data.month
    },
    {
      $set: {
        amount: data.amount,
        categoryLimits: data.categoryLimits
      }
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    message: "Budget saved successfully",
    budget
  });
});
