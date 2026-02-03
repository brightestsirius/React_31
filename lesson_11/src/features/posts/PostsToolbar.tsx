import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from "../../types/post";
import type { FilterStatus } from "../../types/post"

export default function PostsToolbar() {
  const openModal = usePostsStore((s) => s.openModal);

  const filterStatus = usePostsStore((s) => s.filterStatus);
  const setFilterStatus = usePostsStore((s) => s.setFilterStatus);

  const search = usePostsStore((s) => s.search);
  const setSearch = usePostsStore((s) => s.setSearch);

  const onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as FilterStatus);
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div className="toolbar">
      <button onClick={() => openModal()}>+ Post</button>

      <select defaultValue={filterStatus} onChange={onChangeFilter}>
        <option value={POST_STATUS.ALL}>All</option>
        <option value={POST_STATUS.DRAFT}>Draft</option>
        <option value={POST_STATUS.PUBLISHED}>Published</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        defaultValue={search}
        onChange={onChangeSearch}
      />
    </div>
  );
}
