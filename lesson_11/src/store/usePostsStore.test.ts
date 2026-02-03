import { describe, it, expect, beforeEach } from "vitest";
import usePostsStore from "./usePostsStore";
import { POST_STATUS } from "../types/post";

describe("usePostsStore", () => {
  beforeEach(() => {
    usePostsStore.setState({
      isModalOpen: false,
      editingPostId: null,
      filterStatus: POST_STATUS.ALL,
      search: "",
    });
  });

  it("should have correct initial state", () => {
    const state = usePostsStore.getState();

    expect(state.isModalOpen).toBe(false);
    expect(state.editingPostId).toBe(null);
    expect(state.filterStatus).toBe(POST_STATUS.ALL);
    expect(state.search).toBe("");
  });

  it("should update filterStatus and search", () => {
    usePostsStore.getState().setFilterStatus(POST_STATUS.DRAFT);
    usePostsStore.getState().setSearch("react");

    const state = usePostsStore.getState();
    expect(state.filterStatus).toBe(POST_STATUS.DRAFT);
    expect(state.search).toBe("react");
  });

  it("should open modal without editing id when openModal() is called without args", () => {
    usePostsStore.getState().openModal();

    const state = usePostsStore.getState();
    expect(state.isModalOpen).toBe(true);
    expect(state.editingPostId).toBe(null);
  });

  it("should open modal and set editing id when openModal(id) is called", () => {
    usePostsStore.getState().openModal("10");

    const state = usePostsStore.getState();
    expect(state.isModalOpen).toBe(true);
    expect(state.editingPostId).toBe("10");
  });

  it("should close modal and reset editing id", () => {
    usePostsStore.getState().openModal("10");
    usePostsStore.getState().closeModal();

    const state = usePostsStore.getState();
    expect(state.isModalOpen).toBe(false);
    expect(state.editingPostId).toBe(null);
  });
});