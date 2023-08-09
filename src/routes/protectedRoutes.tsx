import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, children }) => {


  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
