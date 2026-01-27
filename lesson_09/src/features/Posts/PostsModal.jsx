import React from "react";
import usePostsStore from "../../store/usePostsStore";

import PostForm from "./PostForm";

export default function PostsModal({ posts }) {
  const isEditorOpen = usePostsStore((s) => s.isEditorOpen);
  const editPostId = usePostsStore((s) => s.editPostId);
  const closeEditor = usePostsStore((s) => s.closeEditor);

  const initial = posts.find((item) => item.id === editPostId);

  if (!isEditorOpen) return null;

  return (
    <div className="modal" onClick={closeEditor}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>{initial ? `Edit post #${initial.id}` : `Create post`}</h3>
          <button onClick={closeEditor}>x</button>
        </div>
        <div className="modal__body">
          <PostForm initial={initial} onDone={closeEditor} />
        </div>
      </div>
    </div>
  );
}
