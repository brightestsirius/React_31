import React, { useState } from "react";
import { useLoaderData, Link, useSearchParams } from "react-router";

import {
  TODOS_FILTER_COMPLETED,
  TODOS_FILTER_UNCOMPLETED,
} from "./../../constants/toods.constants";

export default function TodosList() {
  const initialTodos = useLoaderData();
  const [todos, setTodos] = useState(initialTodos);

  const [searchParams] = useSearchParams();
  const filter = searchParams.get(`filter`);

  const getClassName = (item) => {
    const classes = [`todos__item`];
    item.completed && classes.push(`todos__item--completed`);
    return classes.join(` `);
  };

  const filteredList = todos.filter((item) => {
    switch (filter) {
      case TODOS_FILTER_COMPLETED:
        return item.completed;
      case TODOS_FILTER_UNCOMPLETED:
        return !item.completed;
      default:
        return item;
    }
  });

  return filteredList ? (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          <Link to={`/todos/${item.id}`} className={getClassName(item)}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
}
