'use client';
import React, { useState } from 'react';

export default function CreateDatabaseForm() {
  const [dbName, setDbName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/database?dbName=${dbName}`, {
        method: 'POST',
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('Error creating database');
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <h3>Create Database</h3>
      <input
        type="text"
        value={dbName}
        onChange={(e) => setDbName(e.target.value)}
        placeholder="Database name"
        className="form-control mb-2"
      />
      <button className="btn btn-success" onClick={handleCreate}>
        Create Database
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
