let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    const list = document.getElementById("transactionList");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.text} - ₹${transaction.amount}
            <button onclick="deleteTransaction(${index})" style="margin-left:10px;">X</button>
        `;

        list.appendChild(li);

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income + expense;

    document.getElementById("balance").innerText = `₹${balance}`;
    document.getElementById("income").innerText = `₹${income}`;
    document.getElementById("expense").innerText = `₹${Math.abs(expense)}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const text = document.getElementById("text").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (text === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    transactions.push({ text, amount });

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();