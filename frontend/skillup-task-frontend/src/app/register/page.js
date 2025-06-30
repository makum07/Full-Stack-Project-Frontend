'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/auth/register', { username, password });
      alert('Registration Successful! Please login.');
      router.push('/login'); // 👈 Redirect to login page
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: '300px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
