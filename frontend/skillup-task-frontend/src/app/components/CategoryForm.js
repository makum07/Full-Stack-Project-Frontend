'use client';
import { useState } from 'react';
import '../../styles/categoryForm.scss';

export default function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch('http://localhost:8080/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName('');
      onCategoryAdded();
    } else {
      alert('Failed to add category');
    }
  };

  return (
    <form className="category-form mb-3" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">
            Add Category
          </button>
        </div>
      </div>
    </form>
  );
}
