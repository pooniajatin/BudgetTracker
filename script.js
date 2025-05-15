let totalIncome = 0;
let totalExpenses = 0;
let transactions = [];

document.getElementById("income-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("income-amount").value);
  const source = document.getElementById("income-dropdown").value;

  if (!isNaN(amount) && amount > 0) {
    totalIncome += amount;
    transactions.push({ id: Date.now(), type: "Income", source, amount });
    alert(`Income added: ${source} - ₹${amount}`);
    updateSummary();
    updateTransactionList();
    document.getElementById("income-form").reset();
  }
});

document.getElementById("expenses-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const expenseType = document.getElementById("expenses-dropdown").value;
  if (!isNaN(amount) && amount > 0) {
    totalExpenses += amount;
    transactions.push({ id: Date.now(), type: "Expense", source: expenseType, amount });
    alert(`Expense added: ${expenseType} - ₹${amount}`);
    updateSummary();
    updateTransactionList();
    document.getElementById("expenses-form").reset();
  }
});

function updateSummary() {
  const balance = totalIncome - totalExpenses;
  const summaryBox = document.getElementById("summary");

  summaryBox.innerHTML = `
    <h3>Summary</h3>
    <p>Total Income: ₹${totalIncome}</p>
    <p>Total Expenses: ₹${totalExpenses}</p>
    <p><strong>Balance: ₹${balance}</strong></p>
  `;
}

function updateTransactionList() {
    const tableBody = document.getElementById("transaction-body");
    const incomeTotalCell = document.getElementById("income-total");
    const expenseTotalCell = document.getElementById("expense-total");
    const balanceTotalCell = document.getElementById("balance-total");
  
    tableBody.innerHTML = ""; // Clear old rows
  
    // Separate income and expense transactions
    const incomeTransactions = transactions.filter((t) => t.type === "Income");
    const expenseTransactions = transactions.filter((t) => t.type === "Expense");
  
    // Determine the maximum number of rows needed
    const maxRows = Math.max(incomeTransactions.length, expenseTransactions.length);
  
    let runningIncomeTotal = 0;
    let runningExpenseTotal = 0;
  
    for (let i = 0; i < maxRows; i++) {
      const row = document.createElement("tr");
  
      // Income Column
      const incomeCell = document.createElement("td");
      if (incomeTransactions[i]) {
        runningIncomeTotal += incomeTransactions[i].amount;
  
        const incomeText = document.createElement("span");
        incomeText.textContent = `${incomeTransactions[i].source} - ₹${incomeTransactions[i].amount}`;
        incomeText.style.color = "green";
  
        const dateText = document.createElement("small");
        dateText.textContent = ` (Added: ${new Date(incomeTransactions[i].id).toLocaleDateString()})`;
        dateText.style.color = "gray";
  
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => deleteTransaction(incomeTransactions[i].id);
  
        incomeCell.appendChild(incomeText);
        incomeCell.appendChild(dateText);
        incomeCell.appendChild(delBtn);
      }
      row.appendChild(incomeCell);
  
      // Expense Column
      const expenseCell = document.createElement("td");
      if (expenseTransactions[i]) {
        runningExpenseTotal += expenseTransactions[i].amount;
  
        const expenseText = document.createElement("span");
        expenseText.textContent = `${expenseTransactions[i].source} - ₹${expenseTransactions[i].amount}`;
        expenseText.style.color = "red";
  
        const dateText = document.createElement("small");
        dateText.textContent = ` (Added: ${new Date(expenseTransactions[i].id).toLocaleDateString()})`;
        dateText.style.color = "gray";
  
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => deleteTransaction(expenseTransactions[i].id);
  
        expenseCell.appendChild(expenseText);
        expenseCell.appendChild(dateText);
        expenseCell.appendChild(delBtn);
      }
      row.appendChild(expenseCell);
  
      tableBody.appendChild(row);
    }
  
    // Update totals and balance in the footer
    incomeTotalCell.textContent = `Total Income: ₹${runningIncomeTotal}`;
    expenseTotalCell.textContent = `Total Expenses: ₹${runningExpenseTotal}`;
    const balance = runningIncomeTotal - runningExpenseTotal;
  
    // Update balance text and color
    balanceTotalCell.textContent = `Balance: ₹${balance}`;
    balanceTotalCell.style.color = balance >= 0 ? "green" : "red";
  }
function deleteTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);

  if (transaction) {
    if (transaction.type === "Income") {
      totalIncome -= transaction.amount;
    } else {
      totalExpenses -= transaction.amount;
    }

    transactions = transactions.filter((t) => t.id !== id);

    updateSummary();
    updateTransactionList();
  }
}
