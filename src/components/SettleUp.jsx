import React, { useState } from 'react';

function SettleUp({ members, expenses }) {
  const [transactions, setTransactions] = useState([]);

  const calculateDebts = () => {
    // 1. Calculate the net balance for each person
    const balances = {};
    members.forEach(m => balances[m] = 0);

    expenses.forEach(expense => {
      // The person who paid gets a positive balance (they are owed money)
      balances[expense.payer] += expense.amount;
      // Everyone's share reduces their balance (they owe money)
      for (const person in expense.shares) {
        balances[person] -= expense.shares[person];
      }
    });

    // 2. Separate into debtors (owe money) and creditors (owed money)
    const debtors = [];
    const creditors = [];

    for (const person in balances) {
      if (balances[person] < -0.01) debtors.push({ name: person, amount: Math.abs(balances[person]) });
      else if (balances[person] > 0.01) creditors.push({ name: person, amount: balances[person] });
    }

    // Sort descending to settle the largest debts first
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // 3. Match them up to minimize the number of transactions
    const results = [];
    let i = 0; // debtors index
    let j = 0; // creditors index

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const settledAmount = Math.min(debtor.amount, creditor.amount);
      
      results.push(`${debtor.name} owes ${creditor.name} ₹${settledAmount.toFixed(2)}`);

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    if (results.length === 0 && expenses.length > 0) {
      results.push("Everyone is perfectly settled up! No debts.");
    }

    setTransactions(results);
  };

  if (members.length === 0) return null;

  return (
    <div className="panel settle-up-zone">
      <h2>Clear All Debts</h2>
      <button className="settle-btn" onClick={calculateDebts}>Generate Transactions</button>
      
      {transactions.length > 0 && (
        <div style={{ marginTop: '20px', textAlign: 'left', background: 'white', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--primary-color)' }}>Final Settlements:</h3>
          <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.6' }}>
            {transactions.map((t, idx) => (
              <li key={idx} style={{ padding: '5px 0', borderBottom: '1px solid #f3f4f6' }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SettleUp;