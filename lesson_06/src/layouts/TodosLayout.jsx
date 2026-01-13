import React from "react";
import { Outlet } from "react-router";

export default function TodosLayout() {
  return (
    <div className="todos__wrapper">
      <Outlet />
    </div>
  );
}
