import React from "react";
import usePostsStore from "../../store/usePostsStore";

export default function PostsToolbar() {
  const openCreate = usePostsStore((s) => s.openCreate);
  return (
    <div>
      <button onClick={openCreate}>+ Post</button>
    </div>
  );
}