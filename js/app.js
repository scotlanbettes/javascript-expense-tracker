// ========================================
// Expense Tracker V2
// ========================================


// ----------------------------------------
// Load and migrate data
// ----------------------------------------

const savedTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

const oldExpenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];

let transactions = [];


// If V2 transactions already exist, use them
if (savedTransactions) {

    transactions = savedTransactions.map(function(transaction) {

        return {
            ...transaction,
            amount: Number(transaction.amount),
            type: transaction.type || "expense"
        };

    });


// Otherwise migrate the old V1 expenses
} else if (oldExpenses.length > 0) {

    transactions = oldExpenses.map(function(expense) {

        return {
            id: expense.id,
            type: "expense",
            description: expense.description,
            amount: Number(expense.amount),
            category: expense.category,
            date: expense.date
        };

    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


let editingTransactionId = null;


// ========================================
// DOM Elements
// ========================================

const expenseForm =
    document.getElementById("expense-form");

const transactionTypeInput =
    document.getElementById("transaction-type");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const categoryInput =
    document.getElementById("category");

const dateInput =
    document.getElementById("date");

const expenseList =
    document.getElementById("expense-list");

const searchInput =
    document.getElementById("search-expense");

const filterCategory =
    document.getElementById("filter-category");

const sortExpenses =
    document.getElementById("sort-expenses");


const balanceElement =
    document.getElementById("balance");

const totalIncomeElement =
    document.getElementById("total-income");

const totalExpensesElement =
    document.getElementById("total-expenses");

const transactionCountElement =
    document.getElementById("transaction-count");


const submitButton =
    expenseForm.querySelector('button[type="submit"]');


// ========================================
// Save Transactions
// ========================================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// ========================================
// Display Transactions
// ========================================

function displayTransactions(
    category = "All",
    searchTerm = "",
    sortBy = "newest"
) {

    expenseList.innerHTML = "";


    // ------------------------------------
    // Filter by category
    // ------------------------------------

    let filteredTransactions =
        category === "All"
            ? [...transactions]
            : transactions.filter(function(transaction) {

                return transaction.category === category;

            });


    // ------------------------------------
    // Search by description
    // ------------------------------------

    filteredTransactions =
        filteredTransactions.filter(function(transaction) {

            return transaction.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        });


    // ------------------------------------
    // Sort transactions
    // ------------------------------------

    if (sortBy === "newest") {

        filteredTransactions.sort(function(a, b) {

            return new Date(b.date) - new Date(a.date);

        });

    }


    if (sortBy === "oldest") {

        filteredTransactions.sort(function(a, b) {

            return new Date(a.date) - new Date(b.date);

        });

    }


    if (sortBy === "highest") {

        filteredTransactions.sort(function(a, b) {

            return Number(b.amount) - Number(a.amount);

        });

    }


    if (sortBy === "lowest") {

        filteredTransactions.sort(function(a, b) {

            return Number(a.amount) - Number(b.amount);

        });

    }


    // ------------------------------------
    // Empty state
    // ------------------------------------

    if (filteredTransactions.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "No transactions found.";

        expenseList.appendChild(emptyMessage);

        return;

    }


    // ------------------------------------
    // Display each transaction
    // ------------------------------------

    filteredTransactions.forEach(
        function(transaction) {

            const transactionElement =
                document.createElement("div");


            const type =
                transaction.type === "income"
                    ? "Income"
                    : "Expense";


            const description =
                document.createElement("p");

            const amount =
                document.createElement("p");

            const category =
                document.createElement("p");

            const date =
                document.createElement("p");

            const transactionType =
                document.createElement("p");


            description.innerHTML =
                "<strong>Description:</strong> ";

            description.appendChild(
                document.createTextNode(
                    transaction.description
                )
            );


            amount.innerHTML =
                "<strong>Amount:</strong> ";

            amount.appendChild(
                document.createTextNode(
                    Number(transaction.amount)
                        .toFixed(2)
                )
            );


            category.innerHTML =
                "<strong>Category:</strong> ";

            category.appendChild(
                document.createTextNode(
                    transaction.category
                )
            );


            date.innerHTML =
                "<strong>Date:</strong> ";

            date.appendChild(
                document.createTextNode(
                    transaction.date
                )
            );


            transactionType.innerHTML =
                "<strong>Type:</strong> ";

            transactionType.appendChild(
                document.createTextNode(type)
            );


            // Edit button
            const editButton =
                document.createElement("button");

            editButton.textContent = "Edit";

            editButton.addEventListener(
                "click",
                function() {

                    editTransaction(
                        transaction.id
                    );

                }
            );


            // Delete button
            const deleteButton =
                document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener(
                "click",
                function() {

                    deleteTransaction(
                        transaction.id
                    );

                }
            );


            transactionElement.appendChild(
                transactionType
            );

            transactionElement.appendChild(
                description
            );

            transactionElement.appendChild(
                amount
            );

            transactionElement.appendChild(
                category
            );

            transactionElement.appendChild(
                date
            );

            transactionElement.appendChild(
                editButton
            );

            transactionElement.appendChild(
                deleteButton
            );


            expenseList.appendChild(
                transactionElement
            );

        }
    );

}


// ========================================
// Delete Transaction
// ========================================

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            function(transaction) {

                return transaction.id !== id;

            }
        );


    saveTransactions();

    refreshApp();

}


// ========================================
// Edit Transaction
// ========================================

function editTransaction(id) {

    const transaction =
        transactions.find(
            function(transaction) {

                return transaction.id === id;

            }
        );


    if (!transaction) {

        return;

    }


    editingTransactionId = id;


    transactionTypeInput.value =
        transaction.type;

    descriptionInput.value =
        transaction.description;

    amountInput.value =
        transaction.amount;

    categoryInput.value =
        transaction.category;

    dateInput.value =
        transaction.date;


    submitButton.textContent =
        "Update Transaction";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// Calculate Financial Summary
// ========================================

function calculateSummary() {

    const totalIncome =
        transactions
            .filter(function(transaction) {

                return transaction.type === "income";

            })
            .reduce(function(total, transaction) {

                return total +
                    Number(transaction.amount);

            }, 0);


    const totalExpenses =
        transactions
            .filter(function(transaction) {

                return transaction.type === "expense";

            })
            .reduce(function(total, transaction) {

                return total +
                    Number(transaction.amount);

            }, 0);


    const balance =
        totalIncome - totalExpenses;


    balanceElement.textContent =
        balance.toFixed(2);

    totalIncomeElement.textContent =
        totalIncome.toFixed(2);

    totalExpensesElement.textContent =
        totalExpenses.toFixed(2);

    transactionCountElement.textContent =
        transactions.length;

}


// ========================================
// Validate Transaction
// ========================================

function validateTransaction(
    type,
    description,
    amount,
    category,
    date
) {

    if (type === "") {

        alert(
            "Please select a transaction type."
        );

        return false;

    }


    if (description.trim() === "") {

        alert(
            "Please enter a description."
        );

        return false;

    }


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert(
            "Amount must be greater than 0."
        );

        return false;

    }


    if (category === "") {

        alert(
            "Please select a category."
        );

        return false;

    }


    if (date === "") {

        alert(
            "Please select a date."
        );

        return false;

    }


    return true;

}


// ========================================
// Add / Update Transaction
// ========================================

expenseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const type =
            transactionTypeInput.value;

        const description =
            descriptionInput.value.trim();

        const amount =
            Number(amountInput.value);

        const category =
            categoryInput.value;

        const date =
            dateInput.value;


        const isValid =
            validateTransaction(
                type,
                description,
                amount,
                category,
                date
            );


        if (!isValid) {

            return;

        }


        // --------------------------------
        // Update existing transaction
        // --------------------------------

        if (editingTransactionId !== null) {

            const transaction =
                transactions.find(
                    function(transaction) {

                        return (
                            transaction.id ===
                            editingTransactionId
                        );

                    }
                );


            if (!transaction) {

                return;

            }


            transaction.type = type;

            transaction.description =
                description;

            transaction.amount =
                amount;

            transaction.category =
                category;

            transaction.date =
                date;


            editingTransactionId = null;


        // --------------------------------
        // Add new transaction
        // --------------------------------

        } else {

            const transaction = {

                id: Date.now(),

                type: type,

                description: description,

                amount: amount,

                category: category,

                date: date

            };


            transactions.push(
                transaction
            );

        }


        saveTransactions();


        expenseForm.reset();


        submitButton.textContent =
            "Add Transaction";


        refreshApp();

    }
);


// ========================================
// Search
// ========================================

searchInput.addEventListener(
    "input",
    function() {

        displayTransactions(
            filterCategory.value,
            searchInput.value,
            sortExpenses.value
        );

    }
);


// ========================================
// Category Filter
// ========================================

filterCategory.addEventListener(
    "change",
    function() {

        displayTransactions(
            filterCategory.value,
            searchInput.value,
            sortExpenses.value
        );

    }
);


// ========================================
// Sorting
// ========================================

sortExpenses.addEventListener(
    "change",
    function() {

        displayTransactions(
            filterCategory.value,
            searchInput.value,
            sortExpenses.value
        );

    }
);


// ========================================
// Refresh Application
// ========================================

function refreshApp() {

    displayTransactions(
        filterCategory.value,
        searchInput.value,
        sortExpenses.value
    );

    calculateSummary();

}


// ========================================
// Initial Application Load
// ========================================

refreshApp();