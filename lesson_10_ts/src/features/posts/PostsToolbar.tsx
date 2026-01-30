import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from "../../types/post";
import type { PostFilter } from "../../types/post"

export default function PostsToolbar() {
  const openModal = usePostsStore((s) => s.openModal);
  const status = usePostsStore((s) => s.status);
  const search = usePostsStore((s) => s.search);
  const setStatus = usePostsStore((s) => s.setStatus);
  const setSearch = usePostsStore((s) => s.setSearch);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as PostFilter);
  }
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="toolbar">
      <button onClick={() => openModal()}>+ Post</button>
      <select value={status} onChange={onChangeStatus}>
        <option value={POST_STATUS.ALL}>All</option>
        <option value={POST_STATUS.PUBLISHED}>Published</option>
        <option value={POST_STATUS.DRAFT}>Draft</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={onChangeSearch}
      />
    </div>
  );
}
