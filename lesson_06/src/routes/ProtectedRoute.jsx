import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
}
