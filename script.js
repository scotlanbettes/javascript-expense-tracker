let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingExpenseId = null;

const filterCategory = document.getElementById("filter-category");
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const expenseCount = document.getElementById("expense-count");
const searchInput = document.getElementById("search-expense");
const sortExpenses = document.getElementById("sort-expenses");

const submitButton = expenseForm.querySelector('button[type="submit"]');


function displayExpenses(category = "All", searchTerm = "", sortBy = "newest") {
    expenseList.innerHTML = "";

    let filteredExpenses = category === "All"
        ? [...expenses]
        : expenses.filter(function(expense) {
            return expense.category === category;
        });

    filteredExpenses = filteredExpenses.filter(function(expense) {
        return expense.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });


    if (sortBy === "newest") {
        filteredExpenses.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    if (sortBy === "oldest") {
        filteredExpenses.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    }

    if (sortBy === "highest") {
        filteredExpenses.sort(function(a, b) {
            return Number(b.amount) - Number(a.amount);
        });
    }

    if (sortBy === "lowest") {
        filteredExpenses.sort(function(a, b) {
            return Number(a.amount) - Number(b.amount);
        });
    }


    filteredExpenses.forEach(function(expense) {
        const expenseElement = document.createElement("div");

        expenseElement.innerHTML = `
            <p><strong>Description:</strong> ${expense.description}</p>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <p><strong>Date:</strong> ${expense.date}</p>

            <button onclick="editExpense(${expense.id})">
                Edit
            </button>

            <button onclick="deleteExpense(${expense.id})">
                Delete
            </button>

            <hr>
        `;

        expenseList.appendChild(expenseElement);
    });
}


function deleteExpense(id) {
    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses(
        filterCategory.value,
        searchInput.value,
        sortExpenses.value
    );

    calculateTotal(filterCategory.value);
    calculateExpenseCount(filterCategory.value);
}


function editExpense(id) {
    const expense = expenses.find(function(expense) {
        return expense.id === id;
    });

    if (!expense) {
        return;
    }

    editingExpenseId = id;

    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    dateInput.value = expense.date;

    submitButton.textContent = "Update Expense";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function calculateTotal(category = "All") {
    const filteredExpenses = category === "All"
        ? expenses
        : expenses.filter(function(expense) {
            return expense.category === category;
        });

    const total = filteredExpenses.reduce(function(sum, expense) {
        return sum + Number(expense.amount);
    }, 0);

    totalExpenses.textContent = total;
}


function calculateExpenseCount(category = "All") {
    const filteredExpenses = category === "All"
        ? expenses
        : expenses.filter(function(expense) {
            return expense.category === category;
        });

    expenseCount.textContent = filteredExpenses.length;
}


function validateExpense(description, amount, category, date) {
    if (description.trim() === "") {
        alert("Please enter a description.");
        return false;
    }

    if (amount <= 0) {
        alert("Amount must be greater than 0.");
        return false;
    }

    if (category === "") {
        alert("Please select a category.");
        return false;
    }

    if (date === "") {
        alert("Please select a date.");
        return false;
    }

    return true;
}


expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const isValid = validateExpense(
        descriptionInput.value,
        Number(amountInput.value),
        categoryInput.value,
        dateInput.value
    );

    if (!isValid) {
        return;
    }


    if (editingExpenseId !== null) {

        const expense = expenses.find(function(expense) {
            return expense.id === editingExpenseId;
        });

        if (!expense) {
            return;
        }

        expense.description = descriptionInput.value;
        expense.amount = amountInput.value;
        expense.category = categoryInput.value;
        expense.date = dateInput.value;

        editingExpenseId = null;

    } else {

        const expense = {
            id: Date.now(),
            description: descriptionInput.value,
            amount: amountInput.value,
            category: categoryInput.value,
            date: dateInput.value
        };

        expenses.push(expense);
    }


    localStorage.setItem("expenses", JSON.stringify(expenses));


    displayExpenses(
        filterCategory.value,
        searchInput.value,
        sortExpenses.value
    );

    calculateTotal(filterCategory.value);
    calculateExpenseCount(filterCategory.value);

    expenseForm.reset();

    submitButton.textContent = "Add Expense";
});


searchInput.addEventListener("input", function() {
    const selectedCategory = filterCategory.value;
    const searchTerm = searchInput.value;
    const selectedSort = sortExpenses.value;

    displayExpenses(
        selectedCategory,
        searchTerm,
        selectedSort
    );

    calculateTotal(selectedCategory);
    calculateExpenseCount(selectedCategory);
});


filterCategory.addEventListener("change", function() {
    const selectedCategory = filterCategory.value;
    const searchTerm = searchInput.value;
    const selectedSort = sortExpenses.value;

    displayExpenses(
        selectedCategory,
        searchTerm,
        selectedSort
    );

    calculateTotal(selectedCategory);
    calculateExpenseCount(selectedCategory);
});


sortExpenses.addEventListener("change", function() {
    const selectedCategory = filterCategory.value;
    const searchTerm = searchInput.value;
    const selectedSort = sortExpenses.value;

    displayExpenses(
        selectedCategory,
        searchTerm,
        selectedSort
    );
});


displayExpenses();
calculateTotal();
calculateExpenseCount();