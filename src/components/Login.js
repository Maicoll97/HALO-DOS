// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { authService } from '../services/authService'; // Asegúrate de que authService tenga el método login
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await authService.login(email, password);
      navigate('/dashboard'); // Redirige al dashboard después del inicio de sesión exitoso
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="input-group">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="input-group">
        <FaLock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin} className="login-button">
        <FaSignInAlt /> Login
      </button>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/register')} className="register-button">Register here</button>
      </div>
    </div>
  );
}

export default Login;
