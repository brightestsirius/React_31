import React from "react";
import { usePostDeleteMutation } from "../../queries/postQueries";
import usePostsStore from "./../../store/usePostsStore";

export default function PostsList({ posts }) {
  const del = usePostDeleteMutation();
  const openModel = usePostsStore((s) => s.openModel);

  return posts.length ? (
    <ul>
      {posts.map((item) => (
        <li key={item.id}>
          {item.title}{" "}
          <button onClick={() => del.mutate(item.id)}>Delete</button>{" "}
          <button onClick={() => openModel(item.id)}>Update</button>
        </li>
      ))}
    </ul>
  ) : null;
}
