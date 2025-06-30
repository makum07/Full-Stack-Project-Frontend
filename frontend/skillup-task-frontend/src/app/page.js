'use client';
import React, { useEffect, useState } from 'react';
import CategoryTable from './components/CategoryTable';
import CategoryForm from './components/CategoryForm';


export default function HomePage() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    fetch('http://localhost:8080/api/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Categories</h2>
      <CategoryForm onCategoryAdded={fetchCategories} />
      <CategoryTable categories={categories} />

      
    </div>
  );
}
