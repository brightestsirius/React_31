import { create } from "zustand";

export const POST_STATUS = {
  ALL: `all`,
  DRAFT: `draft`,
  PUBLISHED: `published`,
};

const usePostsStore = create((set) => ({
  status: POST_STATUS.ALL,
  search: ``,

  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),

  isEditorOpen: false,
  editPostId: null,

  openCreate: () => set(() => ({ isEditorOpen: true, editPostId: null })),
  openEditor: (id) => set(() => ({ isEditorOpen: true, editPostId: id })),
  closeEditor: () => set(() => ({ isEditorOpen: false, editPostId: null })),
}));

export default usePostsStore;
