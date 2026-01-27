import { create } from "zustand";

export const POST_STATUS = {
  ALL: `all`,
  DRAFT: `draft`,
  PUBLISHED: `published`,
};

const usePostsStore = create((set) => ({
  isEditorOpen: false,
  editPostId: null,

  openCreate: () => set(() => ({ isEditorOpen: true, editPostId: null })),
  openEditor: (id) => set(() => ({ isEditorOpen: true, editPostId: id })),
  closeEditor: () => set(() => ({ isEditorOpen: false, editPostId: null })),
}));

export default usePostsStore;
