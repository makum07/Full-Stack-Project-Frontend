import React from 'react'
import CreateDatabaseForm from '../components/CreateDatabaseForm';
import CreateTableForm from '../components/CreateTableForm';
import DynamicCrudForm from '../components/DynamicCrudForm';
const page = () => {
  return (
    <div>
      <hr className="my-4" />
      <h2>Create Database and Tables</h2>
      <CreateDatabaseForm />
      <CreateTableForm />
      <DynamicCrudForm /> 
    </div>
  )
}

export default page
