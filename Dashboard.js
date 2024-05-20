import React from 'react';
import ActivityLog from './ActivityLog';

const Dashboard = ({ token, logout }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <ActivityLog token={token} />
    </div>
  );
};

export default Dashboard;
