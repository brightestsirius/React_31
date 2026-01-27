import React from "react";
import usePostsStore from "./../../store/usePostsStore";

export default function PostsToolbar() {
  const openModel = usePostsStore((s) => s.openModel);

  return (
    <div>
      <button onClick={openModel}>+ Post</button>
      <select name="" id=""></select>
      <input type="text" placeholder="Search" />
    </div>
  );
}
