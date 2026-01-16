import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import AuthContext from "../contexts/AuthContext";

export default function AuthGuard({ children }) {
  const { state } = useContext(AuthContext);
  const location = useLocation();

  if (!state.isLogin) {
    return <Navigate to={"/"} replace state={{from: location}} />;
  }

  return children;
}
