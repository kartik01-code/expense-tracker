import { Edit3, Search, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/date.js";

const categories = [
  "All",
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

export default function ExpenseList({
  expenses,
  filter,
  setFilter,
  onEdit,
  onDelete,
  isLoading
}) {
  return (
    <section className="panel expense-list-panel">
      <div className="section-title align-start">
        <div>
          <p className="muted-label">Transactions</p>
          <h2>Expense History</h2>
        </div>
      </div>

      <div className="filters">
        <label className="search-box">
          <Search size={18} />
          <input
            value={filter.search}
            onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Search expense..."
          />
        </label>

        <select
          value={filter.category}
          onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="expense-list">
        {isLoading ? (
          <p className="empty-text">Loading your expenses...</p>
        ) : expenses.length === 0 ? (
          <div className="empty-box">
            <h3>No expenses found</h3>
            <p>Add your first expense to start tracking your monthly budget.</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <article className="expense-row" key={expense._id}>
              <div className="expense-left">
                <div className="category-dot">{expense.category.charAt(0)}</div>

                <div>
                  <h3>{expense.title}</h3>
                  <p>
                    {expense.category} • {expense.paymentMethod} • {formatDate(expense.date)}
                  </p>
                  {expense.note && <small>{expense.note}</small>}
                </div>
              </div>

              <div className="expense-right">
                <strong>{formatCurrency(expense.amount)}</strong>

                <div className="row-actions">
                  <button className="icon-btn" onClick={() => onEdit(expense)} title="Edit">
                    <Edit3 size={16} />
                  </button>

                  <button className="icon-btn danger-icon" onClick={() => onDelete(expense._id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
