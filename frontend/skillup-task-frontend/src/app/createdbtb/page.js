'use client';

import React from 'react';
import CreateDatabaseForm from '../components/CreateDatabaseForm';
import CreateTableForm from '../components/CreateTableForm';
import DynamicCrudForm from '../components/DynamicCrudForm';
import withAuth from '../utils/withAuth';

function CreateDbPage() {
  return (
    <div className="container mt-4">
      <hr className="my-4" />
      <h2>Create Database and Tables</h2>
      <CreateDatabaseForm />
      <CreateTableForm />
      <DynamicCrudForm />
    </div>
  );
}

// 🔐 Allow only ADMIN role
export default withAuth(CreateDbPage, ['ROLE_ADMIN']);
