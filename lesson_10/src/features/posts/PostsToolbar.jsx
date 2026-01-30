import React from "react";

import usePostsStore from "./../../store/usePostsStore";
import { POST_STATUS } from "./../../store/usePostsStore";

export default function PostsToolbar() {
  const openModal = usePostsStore((s) => s.openModal);
  const status = usePostsStore((s) => s.status);
  const search = usePostsStore((s) => s.search);
  const setStatus = usePostsStore((s) => s.setStatus);
  const setSearch = usePostsStore((s) => s.setSearch);

  return (
    <div className="toolbar">
      <button onClick={openModal}>+ Post</button>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={POST_STATUS.ALL}>All</option>
        <option value={POST_STATUS.PUBLISHED}>Published</option>
        <option value={POST_STATUS.DRAFT}>Draft</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
