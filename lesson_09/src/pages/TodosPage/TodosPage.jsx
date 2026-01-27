import React from "react";
import { useTodosQuery } from "../../queries/todosQueries";

import TodosToolbar from "./TodosToolbar";
import TodosList from "./TodosList";
import TodosEditorModal from "./TodosEditorModal";

export default function TodosPage() {
  const { data: todos, isLoading, isError, error } = useTodosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || error}</p>;
  return (
    <>
      <TodosToolbar />
      <TodosList todos={todos} />
      <TodosEditorModal todos={todos} />
    </>
  );
}
