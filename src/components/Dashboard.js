// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/registered-users">Registered Users</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
