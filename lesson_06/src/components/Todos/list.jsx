import React from "react";
import { useLoaderData, Link, useSearchParams } from "react-router";

import {
  TODOS_FILTER_COMPLETED,
  TODOS_FILTER_UNCOMPLETED,
} from "../../constants/todos";

export default function TodosList() {
  const todos = useLoaderData();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get(`filter`);

  let filteredList = todos.filter(item => {
    switch (filter) {
      case TODOS_FILTER_COMPLETED:
        return item.completed;
      case TODOS_FILTER_UNCOMPLETED:
        return !item.completed;
      default:
        return item;
    }
  });

  const getClassName = (item) => {
    const classes = [`todos__item`];
    item.completed && classes.push(`todos__item--completed`);
    return classes.join(` `);
  }

  return filteredList ? (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          <Link to={`/todos/${item.id}`} className={getClassName(item)}>{item.title}</Link>
        </li>
      ))}
    </ul>
  ) : null;
}
