'use client';
import { useState } from 'react';
import axios from 'axios';
import '../../styles/taskRow.scss';

export default function TaskRow({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(task);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      // Ensure categoryId is retained during update
      const updatedTask = { ...editForm, categoryId: task.categoryId };

      await axios.put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      alert('Failed to update task: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onTaskUpdated();
    } catch (error) {
      alert('Failed to delete task: ' + error.message);
    }
  };

  return (
    <tr className="task-row">
      <td>
        {isEditing ? (
          <input name="title" className="form-control" value={editForm.title} onChange={handleChange} />
        ) : (
          task.title
        )}
      </td>
      <td>
        {isEditing ? (
          <input name="description" className="form-control" value={editForm.description} onChange={handleChange} />
        ) : (
          task.description
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="dueDate"
            type="date"
            className="form-control"
            value={editForm.dueDate}
            onChange={handleChange}
          />
        ) : (
          task.dueDate
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={editForm.completed}
          onChange={() => setEditForm((prev) => ({ ...prev, completed: !prev.completed }))}
          disabled={!isEditing}
        />
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-success me-1" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-primary me-1" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
