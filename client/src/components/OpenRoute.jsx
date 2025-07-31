import React from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useSelector } from "react-redux";

const OpenRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
   <>
      {children}
   </>
  )

};

export default OpenRoute;
