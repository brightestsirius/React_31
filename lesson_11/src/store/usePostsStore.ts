import { create } from "zustand";
import type { FilterStatus } from '../types/post'
import { POST_STATUS } from '../types/post'

type PostsStore = {
  isModalOpen: boolean,
  editingPostId: string | null,

  filterStatus: FilterStatus,
  setFilterStatus: (filterStatus: FilterStatus) => void,

  search: string
  setSearch: (search: string) => void,

  openModal: (id?: string) => void,
  closeModal: () => void
}

const usePostsStore = create<PostsStore>((set) => ({
  isModalOpen: false,
  editingPostId: null,

  filterStatus: POST_STATUS.ALL,
  setFilterStatus: (filterStatus) => set({ filterStatus }),

  search: ``,
  setSearch: (search) => set({ search }),

  openModal: (id) =>
    set(() => {
      if (id) return { isModalOpen: true, editingPostId: id };
      else return { isModalOpen: true };
    }),
  closeModal: () => set({ isModalOpen: false, editingPostId: null }),
}));

export default usePostsStore;
