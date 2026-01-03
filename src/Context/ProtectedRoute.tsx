import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const token = localStorage.getItem("token");
  const allowed = Boolean(token);

  return allowed ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;