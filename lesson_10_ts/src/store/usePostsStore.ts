import { create } from "zustand";
import type { PostFilter } from "../types/post"
import { POST_STATUS } from "../types/post"

type PostStore = {
  isModalOpen: boolean,
  editingPostId: string | null,

  status: PostFilter,
  search: string,

  setStatus: (status: PostFilter) => void,
  setSearch: (search: string) => void,

  openModal: (id?: string) => void,
  closeModal: () => void
}

const usePostsStore = create<PostStore>((set) => ({
  isModalOpen: false,
  editingPostId: null,

  status: POST_STATUS.ALL,
  search: ``,

  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),

  openModal: (id) => set({ isModalOpen: true, editingPostId: id ?? null }),
  closeModal: () => set({ isModalOpen: false, editingPostId: null }),
}));

export default usePostsStore;
