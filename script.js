// Select DOM Elements
const expenseTypeInput = document.getElementById("expenseType");
const expenseAmountInput = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalExpenseEl = document.getElementById("totalExpense");

// Initialize Expense Data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to Add Expense
function addExpense() {
  const expenseType = expenseTypeInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseType === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Please enter valid expense details!");
    return;
  }

  // Create a new expense object
  const expense = {
    id: Date.now(),
    type: expenseType,
    amount: expenseAmount,
  };

  // Add to the expense array
  expenses.push(expense);

  // Save to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Update UI
  renderExpenses();
  calculateTotalExpense();

  // Clear inputs
  expenseTypeInput.value = "";
  expenseAmountInput.value = "";
}

// Function to Render Expenses
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.type} - $<span>${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Function to Calculate Total Expense
function calculateTotalExpense() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpenseEl.textContent = total.toFixed(2);
}

// Function to Delete Expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);

  // Save updated data to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Update UI
  renderExpenses();
  calculateTotalExpense();
}

// Initialize App
function init() {
  renderExpenses();
  calculateTotalExpense();
}

// Event Listener for Add Expense Button
addExpenseBtn.addEventListener("click", addExpense);

// Start the app
init();
