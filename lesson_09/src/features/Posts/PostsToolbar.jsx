import React from "react";

import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from "../../store/usePostsStore";

export default function PostsToolbar() {
  const openCreate = usePostsStore((s) => s.openCreate);
  const setStatus = usePostsStore((s) => s.setStatus);
  const setSearch = usePostsStore((s) => s.setSearch);

  return (
    <div>
      <button onClick={openCreate}>+ Post</button>{" "}
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value={POST_STATUS.ALL}>All</option>
        <option value={POST_STATUS.DRAFT}>Draft</option>
        <option value={POST_STATUS.PUBLISHED}>Published</option>
      </select>{" "}
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}
