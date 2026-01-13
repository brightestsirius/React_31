import React from "react";

import TodosList from "../../components/Todos/list";
import TodosFilter from "../../components/Todos/filter";

import ComponentErrorBoundary from "../../error-boundaries/ComponentErrorBoundary";

export default function TodosRoute() {
  return (
    <>
      <h1>Todos Route</h1>
      <TodosFilter />
      <ComponentErrorBoundary>
        <TodosList />
      </ComponentErrorBoundary>
    </>
  );
}
