import React from "react";
import { useParams, useLoaderData, useNavigate } from "react-router";

export default function TodoItemRoute() {
  const { id } = useParams();
  const todo = useLoaderData();

  const navigate = useNavigate();

  return (
    <>
      <h1>Todo item #{id}</h1>
      {todo ? (
        <ul>
          {Object.keys(todo).map((key) => (
            <li key={key}>
              {key}: {todo[key]}
            </li>
          ))}
        </ul>
      ) : null}

      <button onClick={() => navigate(`/todos`)}>Back to Todos</button>
    </>
  );
}
