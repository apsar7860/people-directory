import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
