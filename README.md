# Expense Tracker — MERN Stack

![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-purple)

A full-stack **Monthly Budget Expense Tracker** built with the **MERN stack**.  
The application helps users register/login securely, set a monthly budget, add and manage expenses, track spending patterns, and visualize financial data using interactive charts.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Run the Project Locally](#run-the-project-locally)
- [API Routes](#api-routes)
- [Frontend Scripts](#frontend-scripts)
- [Backend Scripts](#backend-scripts)
- [Test Flow](#test-flow)
- [Future Enhancements](#future-enhancements)
- [Common Issues and Fixes](#common-issues-and-fixes)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

**Expense Tracker** is a personal finance management web application where users can manage their monthly budget and expenses in one place.

The project follows a clean MERN architecture:

- **MongoDB** stores users, budgets, and expense records.
- **Express.js + Node.js** power the REST API.
- **React + Vite** build the frontend interface.
- **JWT authentication** protects private user routes.
- **Recharts** visualizes category-wise and daily spending trends.

This project is suitable for internship submission, college project demonstration, resume portfolio, and full-stack MERN practice.

---

## Key Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes for budget, expenses, and summaries
- Current user profile endpoint

### Budget Management

- Set monthly budget
- Update monthly budget
- Track total budget, spent amount, remaining balance, and daily average

### Expense Management

- Add new expenses
- View all expenses
- Edit existing expenses
- Delete expenses
- Filter expenses by month
- Filter expenses by category
- Search transactions by keyword

### Dashboard and Analytics

- Monthly financial overview
- Budget summary cards
- Category-wise spending chart
- Daily spending trend chart
- Recent transactions panel
- Responsive dashboard layout

### UI/UX

- Clean and modern interface
- Responsive design for desktop and mobile
- Fast frontend using Vite
- Reusable React components

### Backend Quality

- RESTful API architecture
- MongoDB models with Mongoose
- Error handling middleware
- Authentication middleware
- CORS configuration
- Security middleware using Helmet
- Request logging using Morgan
- Schema validation support with Zod

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend UI library |
| Vite | Development server and build tool |
| Axios | API requests |
| Recharts | Data visualization |
| Lucide React | Icons |
| CSS3 | Styling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-origin requests |
| helmet | Security headers |
| morgan | HTTP request logging |
| zod | Validation support |

---

## Project Structure

```bash
expense-tracker/
│
├── README.md
│
└── monthly-expense-tracker-mern/
    │
    ├── backend/
    │   ├── src/
    │   │   ├── config/
    │   │   │   └── db.js
    │   │   │
    │   │   ├── controllers/
    │   │   │   ├── authController.js
    │   │   │   ├── budgetController.js
    │   │   │   ├── expenseController.js
    │   │   │   └── summaryController.js
    │   │   │
    │   │   ├── middleware/
    │   │   │   ├── authMiddleware.js
    │   │   │   └── errorMiddleware.js
    │   │   │
    │   │   ├── models/
    │   │   │   ├── User.js
    │   │   │   ├── Budget.js
    │   │   │   └── Expense.js
    │   │   │
    │   │   ├── routes/
    │   │   │   ├── authRoutes.js
    │   │   │   ├── budgetRoutes.js
    │   │   │   ├── expenseRoutes.js
    │   │   │   └── summaryRoutes.js
    │   │   │
    │   │   ├── utils/
    │   │   │   ├── asyncHandler.js
    │   │   │   └── month.js
    │   │   │
    │   │   └── app.js
    │   │
    │   ├── package.json
    │   └── server.js
    │
    └── frontend/
        ├── src/
        │   ├── api/
        │   │   └── api.js
        │   │
        │   ├── components/
        │   ├── context/
        │   ├── pages/
        │   ├── utils/
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── styles.css
        │
        ├── index.html
        ├── package.json
        └── vite.config.js
```

---

## Screenshots

Add your project screenshots here after running the application.

```md
![Dashboard Screenshot](./screenshots/dashboard.png)
![Expense List Screenshot](./screenshots/expenses.png)
![Login Screenshot](./screenshots/login.png)
```

Recommended screenshots:

- Login page
- Register page
- Dashboard
- Add expense form
- Expense table/list
- Category-wise chart
- Monthly summary section

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Compass or local MongoDB Server
- Git
- VS Code or any code editor

Check versions:

```bash
node -v
npm -v
git --version
```

---

## Environment Variables

### Backend `.env`

Create a `.env` file inside:

```bash
monthly-expense-tracker-mern/backend/.env
```

Add the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/monthly_expense_tracker
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

Create a `.env` file inside:

```bash
monthly-expense-tracker-mern/frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit real secrets or production database credentials to GitHub.

---

## Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/kartik01-code/expense-tracker.git
cd expense-tracker/monthly-expense-tracker-mern
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

To check if the API is running, open:

```bash
http://localhost:5000
```

Expected response:

```json
{
  "success": true,
  "message": "Monthly Budget Expense Tracker API is running"
}
```

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd expense-tracker/monthly-expense-tracker-mern/frontend
npm install
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## API Routes

Base backend URL:

```bash
http://localhost:5000/api
```

Protected routes require a JWT token in the request header:

```http
Authorization: Bearer <token>
```

---

### Auth Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user and return token | No |
| GET | `/api/auth/me` | Get logged-in user profile | Yes |

---

### Budget Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/api/budgets?month=2026-05` | Get budget for selected month | Yes |
| PUT | `/api/budgets` | Create or update monthly budget | Yes |

---

### Expense Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/api/expenses?month=2026-05` | Get expenses for selected month | Yes |
| POST | `/api/expenses` | Add a new expense | Yes |
| PUT | `/api/expenses/:id` | Update an expense | Yes |
| DELETE | `/api/expenses/:id` | Delete an expense | Yes |

---

### Summary Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/api/summary?month=2026-05` | Get monthly summary and analytics | Yes |

---

## Sample API Requests

### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

---

### Login User

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

---

### Add Expense

```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-05-10",
  "note": "College lunch"
}
```

---

### Set Monthly Budget

```http
PUT /api/budgets
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "month": "2026-05",
  "amount": 15000
}
```

---

## Frontend Scripts

Run these commands inside the `frontend` folder.

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

---

## Backend Scripts

Run these commands inside the `backend` folder.

```bash
npm run dev
```

Starts the backend with Nodemon for development.

```bash
npm start
```

Starts the backend using Node.js.

---

## Test Flow

Use this flow to test the complete application:

1. Start MongoDB locally.
2. Start backend server.
3. Start frontend server.
4. Register a new user.
5. Login with the registered account.
6. Set a monthly budget.
7. Add expenses under different categories.
8. View dashboard cards.
9. Check category-wise spending chart.
10. Check daily spending trend chart.
11. Filter expenses by month/category/search.
12. Edit an expense.
13. Delete an expense.
14. Refresh the page and verify data persistence.

---

## Future Enhancements

Possible improvements for the next version:

- Income tracking
- Savings goal tracker
- Export expenses as CSV/PDF
- Dark mode
- Recurring expenses
- Budget warning notification
- Email alerts for overspending
- Multi-currency support
- Expense receipt image upload
- Admin dashboard
- Docker setup
- Deployment on Render/Vercel/Netlify
- Unit and integration testing

---

## Common Issues and Fixes

### 1. MongoDB connection failed

Check that MongoDB is running and `MONGO_URI` is correct.

```env
MONGO_URI=mongodb://127.0.0.1:27017/monthly_expense_tracker
```

### 2. Backend port already in use

Change the backend port in `.env`:

```env
PORT=5001
```

Then update frontend `.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Frontend cannot connect to backend

Make sure:

- Backend is running.
- Frontend `.env` has the correct `VITE_API_URL`.
- Backend `CLIENT_URL` matches frontend URL.
- CORS is configured correctly.

### 4. Token not working

Try logging out and logging in again. Also check that the request contains:

```http
Authorization: Bearer <token>
```

---

## Deployment Guide

### Backend Deployment

You can deploy the backend on:

- Render
- Railway
- Cyclic
- AWS
- Azure
- DigitalOcean

Production backend environment variables:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend Deployment

You can deploy the frontend on:

- Vercel
- Netlify
- GitHub Pages

Production frontend environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## GitHub Repository

```bash
https://github.com/kartik01-code/expense-tracker.git
```

---

## Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push to your branch.

```bash
git push origin feature/your-feature-name
```

6. Create a pull request.

---

## Author

**kartik01-code**

GitHub: [https://github.com/kartik01-code](https://github.com/kartik01-code)

---

## Project Status

This project is ready for local development, portfolio presentation, and internship/college submission. Further improvements can be added for production-level deployment.
