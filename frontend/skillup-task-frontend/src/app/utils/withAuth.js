'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedPage(props) {
    const { token, role } = useSelector((state) => state.auth);
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
      if (!token) {
        router.replace('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        router.replace('/');
      } else {
        setCheckingAuth(false); // Auth successful
      }
    }, [token, role]);

    // 🛑 While checking auth, don't show the page
    if (checkingAuth) {
      return null; // or a loader if you prefer
    }

    return <Component {...props} />;
  };
}
