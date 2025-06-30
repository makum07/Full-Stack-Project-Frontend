'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import '../../../styles/taskPage.scss';
import TaskRow from '@/app/components/TaskRow';
import TaskForm from '@/app/components/TaskForm';

export default function TaskPage() {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(
        `http://localhost:8080/api/tasks?categoryId=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      alert('Error fetching tasks. Please login or check permissions.');
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchTasks();
    }
  }, [categoryId]);

  return (
    <div className="task-page">
      <h2>Tasks for Category #{categoryId}</h2>
      <TaskForm categoryId={categoryId} onTaskAdded={fetchTasks} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onTaskUpdated={fetchTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
