'use client';
import { useState } from 'react';
import axios from 'axios';
import '../../styles/taskForm.scss';

export default function TaskForm({ categoryId, onTaskAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      ...form,
      completed: false,
      categoryId,
    };

    try {
      await axios.post('http://localhost:8080/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({ title: '', description: '', dueDate: '' });
      onTaskAdded();
    } catch (error) {
      alert('Failed to add task: ' + error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="row g-2 mb-2">
        <div className="col">
          <input
            name="title"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            name="description"
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            name="dueDate"
            type="date"
            className="form-control"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
