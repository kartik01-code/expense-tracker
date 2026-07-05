import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Monthly Budget Expense Tracker API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/summary", summaryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
