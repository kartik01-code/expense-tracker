import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
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
      ]
    },
    paymentMethod: {
      type: String,
      trim: true,
      enum: ["Cash", "UPI", "Card", "Net Banking", "Wallet", "Other"],
      default: "UPI"
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now
    },
    note: {
      type: String,
      trim: true,
      maxlength: 300,
      default: ""
    }
  },
  { timestamps: true }
);

expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
