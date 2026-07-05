import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { formatCurrency } from "../utils/date.js";

export default function BudgetPanel({ month, summary, onSaved, notify }) {
  const [amount, setAmount] = useState(0);
  const usedPercent = Math.min(summary?.budgetUsedPercent || 0, 100);

  useEffect(() => {
    setAmount(summary?.totalBudget || 0);
  }, [summary?.totalBudget]);

  const saveBudget = async (e) => {
    e.preventDefault();

    try {
      await api.put("/budgets", {
        month,
        amount: Number(amount),
        categoryLimits: []
      });

      notify("Budget updated successfully");
      onSaved();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <section className="panel budget-panel">
      <div className="section-title">
        <div>
          <p className="muted-label">Monthly Plan</p>
          <h2>Budget Control</h2>
        </div>
        <span className={summary?.remaining >= 0 ? "pill positive" : "pill danger"}>
          {summary?.remaining >= 0 ? "On Track" : "Over Budget"}
        </span>
      </div>

      <form onSubmit={saveBudget} className="budget-form">
        <label>
          <span>Monthly Budget</span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter monthly budget"
          />
        </label>

        <button className="primary-btn" type="submit">
          <Save size={18} />
          Save
        </button>
      </form>

      <div className="progress-wrap">
        <div className="progress-meta">
          <span>{formatCurrency(summary?.totalSpent)} spent</span>
          <span>{usedPercent.toFixed(0)}%</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${usedPercent}%` }} />
        </div>

        <p className="tiny-text">
          Remaining this month: <strong>{formatCurrency(summary?.remaining)}</strong>
        </p>
      </div>
    </section>
  );
}
