import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { loginData, isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');  // تحقق من التوثيق

  const allowed = !!token ;

  return allowed ? element : <Navigate to="/login" />;  // إذا كان المستخدم مسجل دخوله يعرض الـ element، وإذا لا يوجهه للـ login
};

export default ProtectedRoute;