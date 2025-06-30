'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CategoryTable from './components/CategoryTable';
import CategoryForm from './components/CategoryForm';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const { token, role } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="text-center mt-5">
        <h3>Please login to view and manage categories.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>All Categories</h2>
      {role === 'ROLE_ADMIN' && (
        <CategoryForm onCategoryAdded={fetchCategories} />
      )}
      <CategoryTable categories={categories} />
    </div>
  );
}
