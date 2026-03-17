import React, { useState, useEffect } from 'react';
import SquadList from './components/SquadList';
import ExpenseEntry from './components/ExpenseEntry';
import Overview from './components/Overview';
import SettleUp from './components/SettleUp';
import './App.css';

function App() {
  // 1. Initialize state from localStorage, or default to empty arrays
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('fairshare_members');
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('fairshare_expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // 2. Auto-save to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem('fairshare_members', JSON.stringify(members));
  }, [members]);

  // 3. Auto-save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('fairshare_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // 4. The Reset Function
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all data? This will wipe all debts and cannot be undone.")) {
      setMembers([]);
      setExpenses([]);
      localStorage.removeItem('fairshare_members');
      localStorage.removeItem('fairshare_expenses');
    }
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: 0 }}>FairShare Splitter</h1>
        <button 
          onClick={handleReset} 
          style={{ width: 'auto', backgroundColor: '#dc2626', marginTop: 0 }}
        >
          Reset Dashboard
        </button>
      </div>
      
      <div className="dashboard-grid">
        <SquadList members={members} setMembers={setMembers} />
        <ExpenseEntry members={members} expenses={expenses} setExpenses={setExpenses} />
        <Overview members={members} expenses={expenses} />
        <SettleUp members={members} expenses={expenses} />
      </div>
    </div>
  );
}

export default App;