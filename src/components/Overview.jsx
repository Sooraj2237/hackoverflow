import React from 'react';

function Overview({ members, expenses }) {
  const balances = members.map(member => {
    const totalPaid = expenses
      .filter(e => e.payer === member)
      .reduce((sum, e) => sum + e.amount, 0);

    const totalShare = expenses
      .reduce((sum, e) => sum + (e.shares[member] || 0), 0);

    return {
      name: member,
      paid: totalPaid,
      share: totalShare
    };
  });

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="panel">
      <h2>Spending Overview</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {balances.map((b, i) => (
          <div key={i} style={{ 
            padding: '15px', 
            background: 'var(--bg-color)', 
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <strong style={{ fontSize: '1.1rem' }}>{b.name}</strong>
            <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>Paid: ₹{b.paid.toFixed(2)}</div>
              <div style={{ color: '#b91c1c', fontWeight: 'bold' }}>Share: ₹{b.share.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;