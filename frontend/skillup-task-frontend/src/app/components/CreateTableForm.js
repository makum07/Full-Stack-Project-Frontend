'use client';
import React, { useState } from 'react';

export default function CreateTableForm() {
  const [dbName, setDbName] = useState('');
  const [tableName, setTableName] = useState('');
  const [fields, setFields] = useState([{ name: '', type: '' }]);
  const [message, setMessage] = useState('');

  const dataTypes = [
    'SERIAL PRIMARY KEY',
    'INT',
    'BIGINT',
    'VARCHAR(50)',
    'VARCHAR(100)',
    'TEXT',
    'BOOLEAN',
    'DATE',
    'TIMESTAMP',
    'DECIMAL(10,2)',
  ];

  const handleAddField = () => {
    setFields([...fields, { name: '', type: '' }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/database/table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbName, tableName, fields }),
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('Error creating table');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Create Table</h3>
      <input
        type="text"
        value={dbName}
        onChange={(e) => setDbName(e.target.value)}
        placeholder="Database name"
        className="form-control mb-2"
      />
      <input
        type="text"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        placeholder="Table name"
        className="form-control mb-2"
      />
      <h5>Fields</h5>
      {fields.map((field, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            placeholder="Column name"
            className="form-control"
          />
          <select
            className="form-select"
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
          >
            <option value="">-- Select Data Type --</option>
            {dataTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button className="btn btn-secondary mb-2" onClick={handleAddField}>
        + Add Field
      </button>
      <br />
      <button className="btn btn-success" onClick={handleCreate}>
        Create Table
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
