import React from "react";
import usePostsStore from "./../../store/usePostsStore";
import PostForm from "./PostForm";

export default function PostsModal({ posts }) {
  const isModalOpen = usePostsStore((s) => s.isModalOpen);
  const closeModel = usePostsStore((s) => s.closeModel);
  const editingPostId = usePostsStore((s) => s.editingPostId);

  if (!isModalOpen) return;

  const currentPost = editingPostId
    ? posts.find((item) => item.id === editingPostId)
    : null;

  return (
    <div className="modal" onClick={closeModel}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h4>
            {currentPost ? `Editing post #${currentPost.id}` : `Create post`}
          </h4>
          <button onClick={closeModel}>x</button>
        </div>
        <div className="modal__body">
          <PostForm currentPost={currentPost} />
        </div>
      </div>
    </div>
  );
}
