import React from "react";
import usePostsStore from "./../../store/usePostsStore";

export default function PostsToolbar() {
  const openModal = usePostsStore((s) => s.openModal);

  return (
    <div className="toolbar">
      <button onClick={openModal}>+ Post</button>
      <select name="" id=""></select>
      <input type="text" placeholder="Search" />
    </div>
  );
}
