import React from "react";

import TodosFilter from "../../components/todos/TodosFilter";
import TodosList from "../../components/todos/TodosList";

import ErrorBoundary from "../../error-bundling/ErrorBoundary";

export default function TodosRoute() {
  return (
    <>
      <h1>Todos Route</h1>
      <TodosFilter />
      <ErrorBoundary>
        <TodosList />
      </ErrorBoundary>
    </>
  );
}
