# Monthly Budget Expense Tracker - MERN Stack

A modern full-stack expense tracker built with **MongoDB + Express + React + Node.js**.

## Features

- Secure login/signup using JWT
- Monthly budget setup
- Add, edit, delete expenses
- Filter expenses by month, category, and search keyword
- Dashboard cards for budget, spent amount, remaining balance, and daily average
- Category-wise spending chart
- Daily spending trend chart
- Recent transactions panel
- Responsive modern UI/UX
- MongoDB database with Mongoose models
- Clean API structure for internship/project submission

---

## Folder Structure

```txt
monthly-expense-tracker-mern/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    .env.example
    package.json
    server.js

  frontend/
    src/
      api/
      components/
      context/
      pages/
      utils/
    package.json
    vite.config.js
```

---

## Backend Setup

Open terminal:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Default MongoDB URI:

```txt
mongodb://127.0.0.1:27017/monthly_expense_tracker
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Test Flow

1. Register a new account
2. Set your monthly budget
3. Add expenses
4. Check charts and monthly summary
5. Filter expenses by category/month
6. Edit/delete any expense

---

## Important API Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Budget

```txt
GET /api/budgets?month=2026-05
PUT /api/budgets
```

### Expenses

```txt
GET    /api/expenses?month=2026-05
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

### Summary

```txt
GET /api/summary?month=2026-05
```

---

## Tech Stack

MongoDB, Express.js, React.js, Node.js, Mongoose, JWT, Axios, Recharts, CSS3
