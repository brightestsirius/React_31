import React from "react";
import { useDeletePostsMutation } from "../../queries/postsQueries";

import { POST_STATUS } from "./../../store/usePostsStore";
import usePostsStore from '../../store/usePostsStore'

export default function PostsList({ posts }) {
  const del = useDeletePostsMutation();
  const openEditor = usePostsStore(s => s.openEditor);

  const getClassName = (item) => {
    const classes = [`list__item`];
    if (item.status === POST_STATUS.DRAFT) classes.push(`list__item--draft`);

    return classes.join(` `);
  };

  return posts.length ? (
    <ul>
      {posts.map((item) => (
        <li key={item.id} className={getClassName(item)}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>{" "}
          <button onClick={() => del.mutate(item.id)}>Delete</button>{" "}
          <button onClick={() => openEditor(item.id)}>Update</button>
        </li>
      ))}
    </ul>
  ) : null;
}
