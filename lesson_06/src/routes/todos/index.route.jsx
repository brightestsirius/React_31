import React from "react";

import TodosForm from "../../components/Todos/form";
import TodosList from "../../components/Todos/list";
import TodosFilter from "../../components/Todos/filter";

import ComponentErrorBoundary from "../../error-boundaries/ComponentErrorBoundary";

export default function TodosRoute() {
  return (
    <>
      <h1>Todos Route</h1>
      <TodosForm />
      <TodosFilter />
      <ComponentErrorBoundary>
        <TodosList />
      </ComponentErrorBoundary>
    </>
  );
}
