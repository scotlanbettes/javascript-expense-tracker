# JavaScript Expense Tracker – Version 2 Plan

## Developer

Job Munyoki

## Project Goal

Version 2 will independently extend the original JavaScript Expense Tracker into a more complete personal finance management application.

The goal is to improve functionality, usability, reporting, budgeting, and data management while continuing to strengthen JavaScript development skills.

## Version 2 Features

### 1. Income and Expense Transactions

- Support both income and expense records
- Clearly distinguish transaction types
- Calculate total income
- Calculate total expenses
- Calculate current balance

### 2. Dashboard

Display:

- Current balance
- Total income
- Total expenses
- Number of transactions
- Recent transactions

### 3. Expense Categories

Support categories such as:

- Food
- Transport
- Rent
- Utilities
- Entertainment
- Health
- Shopping
- Education
- Other

### 4. Budget Management

- Set monthly budgets
- Set category budgets
- Track budget usage
- Warn users when spending approaches the budget
- Show when budgets are exceeded

### 5. Charts and Reports

Add visual reports for:

- Expense distribution by category
- Monthly income vs expenses
- Spending trends

### 6. Advanced Filtering

Allow transactions to be filtered by:

- Transaction type
- Category
- Date
- Date range
- Amount

### 7. Search and Sorting

Improve transaction searching and sorting by:

- Description
- Amount
- Date
- Category

### 8. Recurring Transactions

Support recurring items such as:

- Rent
- Salary
- Subscriptions
- Utility bills

### 9. Data Export

Allow users to export transaction data to CSV.

### 10. Data Import and Backup

- Export application data
- Import previously saved data
- Support JSON backup and restore

### 11. Improved Local Storage

Improve how transactions, budgets, settings, and application preferences are stored.

### 12. Dark Mode

Add light and dark themes with the selected theme saved locally.

### 13. Responsive Design

Improve the interface for:

- Desktop
- Tablet
- Mobile

### 14. Form Validation

Improve validation for:

- Empty fields
- Invalid amounts
- Invalid dates
- Duplicate or incorrect records

### 15. Code Refactoring

Break the JavaScript code into logical modules such as:

- app.js
- transactions.js
- storage.js
- dashboard.js
- budgets.js
- charts.js
- utils.js

## Proposed Folder Structure

```text
javascript-expense-tracker/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── transactions.js
│   ├── storage.js
│   ├── dashboard.js
│   ├── budgets.js
│   ├── charts.js
│   └── utils.js
├── assets/
├── V2_PLAN.md
└── README.md
```
