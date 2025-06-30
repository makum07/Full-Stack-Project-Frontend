'use client';
import { useState } from 'react';
import axios from 'axios';
import '../../styles/categoryForm.scss';

export default function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:8080/api/categories',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setName('');
        onCategoryAdded();
      }
    } catch (error) {
      console.error('Error creating category:', error);
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
