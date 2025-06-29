'use client';
import Link from 'next/link';
import '../../styles/categoryTable.scss';

export default function CategoryTable({ categories }) {
  return (
    <table className="table table-bordered category-table">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
            <td>
              <Link href={`/tasks/${cat.id}`}>
                <button className="btn btn-primary">View Tasks</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
