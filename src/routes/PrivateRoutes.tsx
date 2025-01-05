import React from "react";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "../page/Forbidden/ForbiddenPage";
import Cookies from "js-cookie";

interface PrivateRoutesProps {
  requiredRole?: string;
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  requiredRole,
  children,
}) => {
  const token = localStorage.getItem("token");
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
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
