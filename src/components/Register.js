// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; // Asegúrate de que authService tenga el método register
import '../styles/common.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Para los iconos de verificación


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authService.register(email, password, {
        city,
        country,
        phone,
        postalCode,
        documentNumber,
        gender,
        birthDate,
      });
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password-confirmation">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordsMatch && confirmPassword && (
          <FaCheckCircle className="check-icon" />
        )}
        {password && confirmPassword && !passwordsMatch && (
          <FaTimesCircle className="error-icon" />
        )}
      </div>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Document Number"
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleRegister} className="register-button">Register</button>
      <div className="login-link">
        <p>
          Already have an account? <button onClick={() => navigate('/login')} className="login-button">Login here</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
