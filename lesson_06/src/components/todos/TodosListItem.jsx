import React from "react";
import { useLoaderData } from "react-router";

export default function TodosListItem() {
  const data = useLoaderData();
  return data ? (
    <ul>
      {Object.keys(data).map((key) => (
        <li key={key}>
          {key}: {String(data[key])}
        </li>
      ))}
    </ul>
  ) : null;
}
