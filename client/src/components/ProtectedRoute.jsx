import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let isAdmin = false;
  try {
    const stored = localStorage.getItem('vw_admin');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.role === 'admin') isAdmin = true;
    }
  } catch (e) {
    isAdmin = false;
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export default ProtectedRoute; 