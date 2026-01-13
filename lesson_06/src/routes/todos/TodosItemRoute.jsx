import React from "react";
import { useParams, Link } from "react-router";

import TodosListItem from "./../../components/todos/TodosListItem";
import ErrorBoundary from "../../error-bundling/ErrorBoundary";
import NavigateButton from './../../components/NavigateButton/NavigateButton'

export default function TodosItemRoute() {
  const { id } = useParams(); // /todos/:id

  return (
    <>
      <h1>TodosItem #{id} Route</h1>
      <ErrorBoundary>
        <TodosListItem />
      </ErrorBoundary>

      <NavigateButton title={"Back to list"} path={"/todos"} />
    </>
  );
}
