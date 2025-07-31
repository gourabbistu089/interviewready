import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';
import { useSelector } from 'react-redux';



const ProtectedRoute= ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  console.log("user in protected route", user, "loading", loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;