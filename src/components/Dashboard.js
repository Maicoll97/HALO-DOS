// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { FaHome, FaBox, FaUsers } from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <FaBox className="nav-icon" />
              <span>Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/registered-users" className="nav-link">
              <FaUsers className="nav-icon" />
              <span>Registered Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
