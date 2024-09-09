// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Products from './components/Products';
import RegisteredUsers from './components/RegisteredUsers';
import Statistics from './components/Statistics'; // Importa el nuevo componente
import './styles/common.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/registered-users" element={<RegisteredUsers />} />
        <Route path="/statistics" element={<Statistics />} /> {/* Nueva ruta para Statistics */}
        <Route path="/" element={<Login />} /> {/* Redirige a Login por defecto */}
      </Routes>
    </Router>
  );
}

export default App;
