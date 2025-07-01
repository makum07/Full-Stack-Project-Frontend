'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../redux/authSlice';

export default function Navbar() {
  const { username, token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuth());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">SkillUp Task Manager</Link>

        <div className="d-flex ms-auto align-items-center">
          {/* ✅ Role check updated from 'ADMIN' to 'ROLE_ADMIN' */}
          {role === 'ROLE_ADMIN' && (
            <Link className="btn btn-outline-secondary me-3" href="/createdbtb">
              Create DB & Tables
            </Link>
          )}

          {!token ? (
            <>
              <Link className="btn btn-outline-primary me-2" href="/login">Login</Link>
              <Link className="btn btn-outline-success" href="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="navbar-text me-3">👋 {username}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
