import React, { useReducer } from "react";
import { RouterProvider} from "react-router";

import router from "./app/routes";

import {reducer, initialState} from "./store/authSlice";

import AuthContext from "./contexts/AuthContext";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}
