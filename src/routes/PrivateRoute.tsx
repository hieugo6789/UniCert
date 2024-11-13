import React from "react";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "../page/Forbidden/ForbiddenPage";

interface PrivateRouteProps {
  token: string | null;
  role?: string;
  requiredRole?: string;
  children: React.ReactNode;
}

// Component PrivateRoute
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  token,
  role,
  requiredRole,
  children,
}) => {
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  if (requiredRole && role !== requiredRole) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
