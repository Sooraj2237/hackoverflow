# 💸 FairShare Splitter 

> **A smart, intuitive "Debt Destroyer" built for the HackOverflow Hackathon.**

[![Website](https://img.shields.io/badge/Live%20Demo-Hosted%20on%20GitHub%20Pages-success?style=for-the-badge&logo=github)](https://sooraj2237.github.io/hackoverflow) 
[![Video Demo](https://img.shields.io/badge/Video%20Demo-Watch%20on%20YouTube-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=FbBAT80pazY)

## 🎯 The Mission
Group trips and dinners are fun until it's time to settle the bill. The **FairShare Splitter** is a React-based web application designed to calculate exactly who owes whom, making sure every rupee is accounted for. It transforms a chaotic web of group expenses into a perfectly optimized list of minimal transactions.

## ✨ Key Features

* **👥 The Squad List:** Easily build your group by adding multiple members by name. Features built-in validation to prevent duplicate entries and keep data clean.
* **🍕 Flexible Splitting:** Log expenses and choose to divide them equally among the group by default, or manually assign exact shares for those who ordered a little extra.
* **📊 Spending Overview:** A clean, real-time dashboard displaying exactly how much each member paid out-of-pocket versus their actual required share of the expenses. 
* **⚙️ The "Settle Up" Engine:** The core algorithm. With one click, generate a final, fully optimized list of transactions to clear all group debts.
* **💾 Persistent Storage:** Powered by `localStorage` and React `useEffect` hooks, ensuring your group data safely survives page reloads and accidental closes. 

## 🧠 The "Debt Destroyer" Algorithm
At the heart of the Settle Up Engine is a **Greedy Algorithm** utilizing a **Two-Pointer technique** to solve the classic "Minimize Cash Flow" problem. 

Instead of tracking who specifically paid for whom on individual receipts, the engine:
1. Aggregates the net balance of every node (member) in the group.
2. Separates the group into sorted `debtors` (negative balance) and `creditors` (positive balance).
3. Greedily matches the highest debtor with the highest creditor, settling the maximum possible amount in a single move.
4. Resolves the entire group's finances in the absolute minimum number of transactions possible.

## 💻 Tech Stack
* **Frontend Library:** React.js (Hooks: `useState`, `useEffect`)
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid)
* **Storage:** Browser Local Storage API

## 🚀 Run It Locally

**1. Clone the repository:**
   ```bash
   git clone "https://github.com/<your_username>/hackoverflow.git"
   ```

**2. Navigate to the directory:**
```bash
cd fairshare-splitter
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the development server:**
```bash
npm run dev
```

---
