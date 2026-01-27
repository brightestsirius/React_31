import { create } from "zustand";

export const POST_STATUS = {
  ALL: `all`,
  DRAFT: `draft`,
  PUBLISHED: `published`,
};

const useTodosStore = create((set) => ({
  status: POST_STATUS.ALL,

  isEditorOpen: false,
  editingTodoId: null,

  openCreate: () => set({ isEditorOpen: true, editingTodoId: null }),
  openEdit: (id) => set({ isEditorOpen: true, editingTodoId: id }),
  closeEdit: () => set({ isEditorOpen: false, editingTodoId: null }),
}));

export default useTodosStore;
