'use client';
import { useState } from 'react';
import '../../styles/taskRow.scss';

export default function TaskRow({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(task);

  const handleChange = e => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setIsEditing(false);
      onTaskUpdated();
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      onTaskUpdated();
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
          <input name="dueDate" type="date" className="form-control" value={editForm.dueDate} onChange={handleChange} />
        ) : (
          task.dueDate
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={editForm.completed}
          onChange={() => setEditForm(prev => ({ ...prev, completed: !prev.completed }))}
          disabled={!isEditing}
        />
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-success me-1" onClick={handleUpdate}>Save</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-primary me-1" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}
