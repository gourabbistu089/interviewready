import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';
import { useSelector } from 'react-redux';



const ProtectedRoute= ({ children, adminOnly = false }) => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("loading", loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;