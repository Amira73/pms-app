import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element,allowedRoles }) => {
  const { loginData, isAuthenticated } = useAuth();
  const token = localStorage.getItem('token'); 
  
    if (!token) {
    return <Navigate to="/login" replace />;  
  }

  // const allowed = !!token && isAuthenticated && !!loginData;

  // return allowed ? element : <Navigate to="/login" />;  

 if (allowedRoles && !allowedRoles.includes(loginData.userGroup)) {
    return <Navigate to="/not-found" replace />; 
  }

  
  return element;

 
};

export default ProtectedRoute;