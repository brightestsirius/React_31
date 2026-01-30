import usePostsStore from "../../store/usePostsStore";
import PostForm from "./PostForm";
import type { Post } from "../../types/post"

type Props = { posts: Post[] }

export default function PostsModal({ posts }: Props) {
  const isModalOpen = usePostsStore((s) => s.isModalOpen);
  const closeModal = usePostsStore((s) => s.closeModal);
  const editingPostId = usePostsStore((s) => s.editingPostId);

  if (!isModalOpen) return null;

  const currentPost = editingPostId
    ? posts.find((item) => item.id === editingPostId) ?? null
    : null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h4>
            {currentPost ? `Editing post #${currentPost.id}` : `Create post`}
          </h4>
          <button onClick={closeModal}>x</button>
        </div>
        <div className="modal__body">
          <PostForm currentPost={currentPost} onDone={closeModal} />
        </div>
      </div>
    </div>
  );
}
