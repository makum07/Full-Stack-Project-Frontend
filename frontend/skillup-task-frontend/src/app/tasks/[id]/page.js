'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import '../../../styles/taskPage.scss';
import TaskRow from '@/app/components/TaskRow';
import TaskForm from '@/app/components/TaskForm';

export default function TaskPage() {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch(`http://localhost:8080/api/tasks?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
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
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} onTaskUpdated={fetchTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
