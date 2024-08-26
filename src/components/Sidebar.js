import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 p-4">
      <ul>
        <li className="mb-4"><Link to="/">Dashboard</Link></li>
        <li><Link to="/people">People Directory</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
