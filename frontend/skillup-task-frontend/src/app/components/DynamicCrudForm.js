'use client';
import React, { useState } from 'react';

export default function DynamicCrudForm() {
  const [dbName, setDbName] = useState('');
  const [tableName, setTableName] = useState('');
  const [data, setData] = useState([{ key: '', value: '' }]);
  const [id, setId] = useState('');
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const addField = () => setData([...data, { key: '', value: '' }]);

  const formatData = () => {
    const formatted = {};
    data.forEach(({ key, value }) => {
      if (key) formatted[key] = value;
    });
    return formatted;
  };

  const sendRequest = async (method, url) => {
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dbName,
          tableName,
          data: formatData()
        })
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error(err);
      setMessage('Error occurred');
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/dynamic/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbName, tableName })
      });
      const json = await res.json();
      setRecords(json);
      setMessage('Records loaded');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch records');
    }
  };

  const deleteRecord = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/dynamic/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbName, tableName })
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('Delete failed');
    }
  };

  const updateRecord = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/dynamic/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbName, tableName, data: formatData() })
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('Update failed');
    }
  };

  return (
    <div className="mt-5">
      <h3>Perform CRUD Operations</h3>
      <input
        className="form-control mb-2"
        placeholder="Database Name"
        value={dbName}
        onChange={(e) => setDbName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Table Name"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />

      <h5>Data</h5>
      {data.map((field, index) => (
        <div className="d-flex gap-2 mb-2" key={index}>
          <input
            className="form-control"
            placeholder="Column"
            value={field.key}
            onChange={(e) => handleChange(index, 'key', e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
          />
        </div>
      ))}
      <button className="btn btn-secondary mb-3" onClick={addField}>
        + Add Field
      </button>

      <div className="d-flex gap-2 flex-wrap mb-3">
        <button className="btn btn-success" onClick={() => sendRequest('POST', 'http://localhost:8080/api/dynamic/create')}>Create</button>
        <button className="btn btn-info" onClick={fetchRecords}>Read All</button>
      </div>

      <input
        className="form-control mb-2"
        placeholder="Record ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-warning" onClick={updateRecord}>Update by ID</button>
        <button className="btn btn-danger" onClick={deleteRecord}>Delete by ID</button>
      </div>

      {message && <p className="alert alert-info">{message}</p>}

      {records.length > 0 && (
        <div>
          <h5>Records</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                {Object.keys(records[0]).map((col, i) => <th key={i}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((rec, i) => (
                <tr key={i}>
                  {Object.values(rec).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
