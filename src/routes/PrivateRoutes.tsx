import React from "react";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "../page/Forbidden/ForbiddenPage";
import Cookies from "js-cookie";

interface PrivateRoutesProps {
  token: string | null;
  requiredRole?: string;
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  token,
  requiredRole,
  children,
}) => {
  const role = Cookies.get("role");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  if (requiredRole && role !== requiredRole) {
    console.log(requiredRole, role);
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
