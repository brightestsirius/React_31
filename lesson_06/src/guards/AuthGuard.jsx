import React, { useContext } from "react";
import { Navigate } from "react-router";

import AuthContext from "../contexts/AuthContext";

export default function AuthGuard({ children }) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}