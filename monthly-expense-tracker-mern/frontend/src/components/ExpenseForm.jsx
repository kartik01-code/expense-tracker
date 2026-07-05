import { Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { inputDate } from "../utils/date.js";

const categories = [
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

const paymentMethods = ["Cash", "UPI", "Card", "Net Banking", "Wallet", "Other"];

const defaultForm = {
  title: "",
  amount: "",
  category: "Food",
  paymentMethod: "UPI",
  date: new Date().toISOString().slice(0, 10),
  note: ""
};

export default function ExpenseForm({ selectedExpense, clearSelectedExpense, onSaved, notify }) {
  const [form, setForm] = useState(defaultForm);
  const isEditing = Boolean(selectedExpense);

  useEffect(() => {
    if (selectedExpense) {
      setForm({
        title: selectedExpense.title,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        paymentMethod: selectedExpense.paymentMethod,
        date: inputDate(selectedExpense.date),
        note: selectedExpense.note || ""
      });
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    clearSelectedExpense();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount)
    };

    try {
      if (isEditing) {
        await api.put(`/expenses/${selectedExpense._id}`, payload);
        notify("Expense updated successfully");
      } else {
        await api.post("/expenses", payload);
        notify("Expense added successfully");
      }

      resetForm();
      onSaved();
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <section className="panel expense-form-panel">
      <div className="section-title">
        <div>
          <p className="muted-label">{isEditing ? "Update" : "New"} Transaction</p>
          <h2>{isEditing ? "Edit Expense" : "Add Expense"}</h2>
        </div>

        {isEditing && (
          <button className="icon-btn" onClick={resetForm} type="button" title="Reset form">
            <RefreshCw size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
        <label>
          <span>Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Lunch, rent, books"
            required
          />
        </label>

        <div className="two-col">
          <label>
            <span>Amount</span>
            <input
              name="amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={handleChange}
              placeholder="₹"
              required
            />
          </label>

          <label>
            <span>Date</span>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </label>
        </div>

        <div className="two-col">
          <label>
            <span>Category</span>
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Payment</span>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              {paymentMethods.map((method) => (
                <option key={method}>{method}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span>Note</span>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Optional note"
            rows="3"
          />
        </label>

        <button className="primary-btn full" type="submit">
          <Plus size={18} />
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </section>
  );
}
