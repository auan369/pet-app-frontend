import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PetDashboard.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/users/register`, {
        username,
        password,
      });
      
      alert('User registered successfully!');
      navigate('/'); // Redirect to login
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <div className="tamagotchi-console">
      <h1 className="console-header">Login</h1>
      <div className="console-screen"></div>
      <div className="console-buttons">
        <button>🍖 <span>Feed</span></button>
        <button>🎾 <span>Play</span></button>
        <button>🧼 Clean</button>
      </div>
      </div>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
