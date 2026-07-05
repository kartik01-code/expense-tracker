import {
  BadgeIndianRupee,
  CalendarDays,
  PiggyBank,
  TrendingDown
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/api.js";
import BudgetPanel from "../components/BudgetPanel.jsx";
import { CategoryChart, DailyChart } from "../components/Charts.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Header from "../components/Header.jsx";
import StatCard from "../components/StatCard.jsx";
import Toast from "../components/Toast.jsx";
import { formatCurrency, getCurrentMonth } from "../utils/date.js";

export default function Dashboard() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filter, setFilter] = useState({ search: "", category: "All" });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const notify = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2600);
  };

  const fetchDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const [summaryResponse, expenseResponse] = await Promise.all([
        api.get(`/summary?month=${month}`),
        api.get(
          `/expenses?month=${month}&category=${filter.category}&search=${encodeURIComponent(
            filter.search
          )}`
        )
      ]);

      setSummary(summaryResponse.data.summary);
      setExpenses(expenseResponse.data.expenses);
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [month, filter.category, filter.search]);

  useEffect(() => {
    const delay = setTimeout(fetchDashboard, 300);
    return () => clearTimeout(delay);
  }, [fetchDashboard]);

  const stats = useMemo(() => {
    return [
      {
        title: "Monthly Budget",
        value: formatCurrency(summary?.totalBudget),
        helper: "Your planned limit",
        icon: PiggyBank,
        tone: "blue"
      },
      {
        title: "Total Spent",
        value: formatCurrency(summary?.totalSpent),
        helper: `${summary?.expenseCount || 0} transactions`,
        icon: TrendingDown,
        tone: "orange"
      },
      {
        title: "Remaining",
        value: formatCurrency(summary?.remaining),
        helper: summary?.remaining >= 0 ? "Safe to spend" : "Budget exceeded",
        icon: BadgeIndianRupee,
        tone: summary?.remaining >= 0 ? "green" : "red"
      },
      {
        title: "Daily Average",
        value: formatCurrency(summary?.dailyAverage),
        helper: "This month",
        icon: CalendarDays,
        tone: "purple"
      }
    ];
  }, [summary]);

  const deleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this expense?");
    if (!confirmed) return;

    try {
      await api.delete(`/expenses/${id}`);
      notify("Expense deleted successfully");
      fetchDashboard();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <main className="dashboard">
      <Toast toast={toast} />

      <Header month={month} setMonth={setMonth} />

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="main-grid">
        <div className="left-stack">
          <BudgetPanel
            month={month}
            summary={summary}
            onSaved={fetchDashboard}
            notify={notify}
          />

          <ExpenseForm
            selectedExpense={selectedExpense}
            clearSelectedExpense={() => setSelectedExpense(null)}
            onSaved={fetchDashboard}
            notify={notify}
          />
        </div>

        <div className="right-stack">
          <div className="charts-grid">
            <CategoryChart data={summary?.categoryBreakdown || []} />
            <DailyChart data={summary?.dailyTrend || []} />
          </div>

          <ExpenseList
            expenses={expenses}
            filter={filter}
            setFilter={setFilter}
            onEdit={setSelectedExpense}
            onDelete={deleteExpense}
            isLoading={loading}
          />
        </div>
      </section>
    </main>
  );
}
