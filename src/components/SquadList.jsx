import React, { useState } from 'react';

function SquadList({ members, setMembers }) {
  const [newName, setNewName] = useState('');

  const handleAddMember = () => {
    const trimmedName = newName.trim();
    if (trimmedName && !members.includes(trimmedName)) {
      setMembers([...members, trimmedName]);
      setNewName(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddMember();
    }
  };

  return (
    <div className="panel">
      <h2>The Squad</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Enter member name..." 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '0' }}
        />
        <button onClick={handleAddMember} style={{ marginTop: '0', width: 'auto' }}>
          Add
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {members.length === 0 ? (
          <li style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>
            No members added yet.
          </li>
        ) : (
          members.map((member, index) => (
            <li 
              key={index} 
              style={{ 
                background: 'var(--bg-color)', 
                margin: '8px 0', 
                padding: '10px', 
                borderRadius: '6px',
                fontWeight: '500'
              }}
            >
              {member}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SquadList;