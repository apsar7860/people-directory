import React from 'react';

const SidePane = ({ row, onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
      <button onClick={onClose} className="text-red-500">Close</button>
      <h2 className="text-xl font-bold">Details</h2>
      <p><strong>Name:</strong> {row.name}</p>
      <p><strong>Role:</strong> {row.role}</p>
      <p><strong>Team:</strong> {row.team}</p>
    </div>
  );
};

export default SidePane;
