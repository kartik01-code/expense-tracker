import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMonthRange } from "../utils/month.js";

export const getMonthlySummary = asyncHandler(async (req, res) => {
  const { month, startDate, endDate } = getMonthRange(req.query.month);

  const budget = await Budget.findOne({
    user: req.user._id,
    month
  });

  const expenses = await Expense.find({
    user: req.user._id,
    date: {
      $gte: startDate,
      $lt: endDate
    }
  }).sort({ date: -1 });

  const totalBudget = budget?.amount || 0;

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = totalBudget - totalSpent;
  const budgetUsedPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 999) : 0;

  const categoryMap = new Map();
  const dailyMap = new Map();

  for (const expense of expenses) {
    categoryMap.set(expense.category, (categoryMap.get(expense.category) || 0) + expense.amount);

    const day = expense.date.toISOString().slice(0, 10);
    dailyMap.set(day, (dailyMap.get(day) || 0) + expense.amount);
  }

  const categoryBreakdown = [...categoryMap.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      percent: totalSpent > 0 ? Number(((amount / totalSpent) * 100).toFixed(2)) : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  const dailyTrend = [...dailyMap.entries()]
    .map(([date, amount]) => ({
      date,
      amount
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const topCategory = categoryBreakdown[0] || null;

  res.json({
    success: true,
    month,
    summary: {
      totalBudget,
      totalSpent,
      remaining,
      budgetUsedPercent: Number(budgetUsedPercent.toFixed(2)),
      expenseCount: expenses.length,
      dailyAverage: expenses.length ? Number((totalSpent / new Date().getDate()).toFixed(2)) : 0,
      topCategory,
      categoryBreakdown,
      dailyTrend,
      recentExpenses: expenses.slice(0, 5)
    }
  });
});
