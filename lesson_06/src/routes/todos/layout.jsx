import React from "react";
import { Outlet } from "react-router";

export default function TodosLayout() {
  return (
    <>
      <h2>Todos 🌺</h2>
      <Outlet />
    </>
  );
}
