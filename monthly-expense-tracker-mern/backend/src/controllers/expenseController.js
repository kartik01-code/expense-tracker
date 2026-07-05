import { z } from "zod";
import Expense from "../models/Expense.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMonthRange } from "../utils/month.js";

const allowedCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Rent",
  "Health",
  "Education",
  "Entertainment",
  "Investment",
  "Other"
];

const allowedPaymentMethods = ["Cash", "UPI", "Card", "Net Banking", "Wallet", "Other"];

const expenseSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum(allowedCategories),
  paymentMethod: z.enum(allowedPaymentMethods).optional().default("UPI"),
  date: z.coerce.date(),
  note: z.string().trim().max(300, "Note cannot exceed 300 characters").optional().default("")
});

export const getExpenses = asyncHandler(async (req, res) => {
  const { month, startDate, endDate } = getMonthRange(req.query.month);

  const filter = {
    user: req.user._id,
    date: {
      $gte: startDate,
      $lt: endDate
    }
  };

  if (req.query.category && req.query.category !== "All") {
    filter.category = req.query.category;
  }

  if (req.query.search) {
    filter.title = {
      $regex: req.query.search,
      $options: "i"
    };
  }

  const sortOption = req.query.sort === "amount" ? { amount: -1 } : { date: -1 };

  const expenses = await Expense.find(filter).sort(sortOption);

  res.json({
    success: true,
    month,
    count: expenses.length,
    expenses
  });
});

export const createExpense = asyncHandler(async (req, res) => {
  const data = expenseSchema.parse(req.body);

  const expense = await Expense.create({
    ...data,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Expense added successfully",
    expense
  });
});

export const updateExpense = asyncHandler(async (req, res) => {
  const data = expenseSchema.partial().parse(req.body);

  const expense = await Expense.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id
    },
    data,
    {
      new: true,
      runValidators: true
    }
  );

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({
    success: true,
    message: "Expense updated successfully",
    expense
  });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({
    success: true,
    message: "Expense deleted successfully"
  });
});
