'use client';
import { useState } from 'react';
import '../../styles/taskForm.scss';

export default function TaskForm({ categoryId, onTaskAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newTask = {
      ...form,
      completed: false,
      categoryId,
    };

    const res = await fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      setForm({ title: '', description: '', dueDate: '' });
      onTaskAdded();
    } else {
      alert('Failed to add task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="row g-2 mb-2">
        <div className="col">
          <input name="title" className="form-control" placeholder="Title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} />
        </div>
        <div className="col">
          <input name="dueDate" type="date" className="form-control" value={form.dueDate} onChange={handleChange} required />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">Add Task</button>
        </div>
      </div>
    </form>
  );
}
