import React from "react";
import { useDeleteTodoMutation } from "./../../queries/todosQueries";
import useTodosStore from "./../../store/useTodosStore";

import { POST_STATUS } from "../../store/useTodosStore";

export default function TodosList({ todos }) {
  const deleteItem = useDeleteTodoMutation();
  const openEdit = useTodosStore((s) => s.openEdit);

  const getClassName = (item) => {
    const classes = [`list__item`];
    if (item.status === POST_STATUS.PUBLISHED)
      classes.push(`list__item--published`);
    return classes.join(` `);
  };

  return todos.length ? (
    <ul>
      {todos.map((item) => (
        <li key={item.id} className={getClassName(item)}>
          <h4>Title: {item.title}</h4>
          <p>Body: {item.body}</p>
          <button onClick={() => deleteItem.mutate(item.id)}>
            Delete
          </button>{" "}
          <button onClick={() => openEdit(item.id)}>Edit</button>
        </li>
      ))}
    </ul>
  ) : null;
}
