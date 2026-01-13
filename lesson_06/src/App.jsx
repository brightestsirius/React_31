import React from "react";
import { RouterProvider } from "react-router";

import AuthContext from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";

import router from "./app/router";

export default function App() {
  const auth = useAuth();

  return (
    <AuthContext value={auth}>
      <RouterProvider router={router} />
    </AuthContext>
  );
}
