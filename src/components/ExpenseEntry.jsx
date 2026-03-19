import React, { useState, useEffect } from 'react';

function ExpenseEntry({ members, expenses, setExpenses }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [splitMethod, setSplitMethod] = useState('equal');
  const [manualShares, setManualShares] = useState({});

  useEffect(() => {
    if (members.length > 0 && !members.includes(payer)) {
      setPayer(members[0]);
    }
  }, [members, payer]);

  const handleManualShareChange = (member, value) => {
    setManualShares({
      ...manualShares,
      [member]: Number(value)
    });
  };

  const handleAddExpense = () => {
    if (!description || !amount || !payer || members.length === 0) {
      alert("Please fill all fields and make sure the squad has members!");
      return;
    }

    const totalAmount = Number(amount);
    let finalShares = {};

    if (splitMethod === 'equal') {
      const splitAmount = totalAmount / members.length;
      members.forEach(m => {
        finalShares[m] = splitAmount;
      });
    } else {
      const currentSum = Object.values(manualShares).reduce((acc, curr) => acc + curr, 0);
      if (currentSum !== totalAmount) {
        alert(`The manual shares (${currentSum}) must exactly equal the total amount (${totalAmount})!`);
        return;
      }
      finalShares = { ...manualShares };
      members.forEach(m => {
         if(!finalShares[m]) finalShares[m] = 0;
      });
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: totalAmount,
      payer,
      splitMethod,
      shares: finalShares
    };

    setExpenses([...expenses, newExpense]);
    
    setDescription('');
    setAmount('');
    setSplitMethod('equal');
    setManualShares({});
  };

  if (members.length === 0) {
    return (
      <div className="panel">
        <h2>Add Expense</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          Add members to the squad list first!
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Add Expense</h2>
      
      <input 
        type="text" 
        placeholder="What was it for?" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      
      <input 
        type="number" 
        placeholder="Total Amount (₹)" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>Who paid?</label>
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          {members.map((m, i) => <option key={i} value={m}>{m}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>Split Method</label>
        <select value={splitMethod} onChange={(e) => setSplitMethod(e.target.value)}>
          <option value="equal">Equally</option>
          <option value="manual">Manually</option>
        </select>
      </div>

      {splitMethod === 'manual' && (
        <div style={{ marginBottom: '15px', padding: '15px', background: 'var(--bg-color)', borderRadius: '6px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>Enter exact shares:</label>
          {members.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ width: '100px', fontSize: '0.9rem' }}>{m}</span>
              <input 
                type="number" 
                placeholder="₹ 0" 
                style={{ marginBottom: '0', padding: '8px' }}
                onChange={(e) => handleManualShareChange(m, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleAddExpense}>Log Expense</button>
    </div>
  );
}

export default ExpenseEntry;