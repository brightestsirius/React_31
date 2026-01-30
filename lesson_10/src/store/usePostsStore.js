import { create } from "zustand";

export const POST_STATUS = {
  ALL: `all`,
  DRAFT: `draft`,
  PUBLISHED: `published`,
};

const usePostsStore = create((set) => ({
  isModalOpen: false,
  editingPostId: null,

  status: POST_STATUS.ALL,
  search: ``,

  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),

  openModal: (id) =>
    set(() => {
      if (id) return { isModalOpen: true, editingPostId: id };
      else return { isModalOpen: true };
    }),
  closeModal: () => set({ isModalOpen: false, editingPostId: null }),
}));

export default usePostsStore;
