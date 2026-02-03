import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import PostsPage from "./PostsPage";
import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from "../../types/post";
import type { Post } from "../../types/post";

vi.mock("../../queries/postQueries", () => ({
  usePostsQuery: () => ({
    data: [
      { id: "1", title: "React Basics", body: "hooks", status: POST_STATUS.PUBLISHED },
      { id: "2", title: "Zustand Store", body: "client state", status: POST_STATUS.DRAFT },
      { id: "3", title: "TanStack Query", body: "cache and mutations", status: POST_STATUS.PUBLISHED },
    ] as Post[],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

vi.mock("./PostsToolbar", () => ({
  default: () => <div data-testid="toolbar" />,
}));

vi.mock("./PostsModal", () => ({
  default: () => <div data-testid="modal" />,
}));

vi.mock("./PostsList", () => ({
  default: ({ posts }: { posts: Post[] }) => (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  ),
}));

describe("PostsPage", () => {
  beforeEach(() => {
    usePostsStore.setState({
      isModalOpen: false,
      editingPostId: null,
      filterStatus: POST_STATUS.ALL,
      search: "",
    });
  });

  it("should render all posts by default (ALL + empty search)", () => {
    render(<PostsPage />);

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("Zustand Store")).toBeInTheDocument();
    expect(screen.getByText("TanStack Query")).toBeInTheDocument();
  });

  it("should filter posts by status", () => {
    usePostsStore.getState().setFilterStatus(POST_STATUS.DRAFT);

    render(<PostsPage />);

    expect(screen.queryByText("React Basics")).not.toBeInTheDocument();
    expect(screen.getByText("Zustand Store")).toBeInTheDocument();
    expect(screen.queryByText("TanStack Query")).not.toBeInTheDocument();
  });

  it("should filter posts by search (title/body)", () => {
    usePostsStore.getState().setSearch("react");

    render(<PostsPage />);

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.queryByText("Zustand Store")).not.toBeInTheDocument();
    expect(screen.queryByText("TanStack Query")).not.toBeInTheDocument();
  });

  it("should combine status + search", () => {
    usePostsStore.getState().setFilterStatus(POST_STATUS.PUBLISHED);
    usePostsStore.getState().setSearch("cache");

    render(<PostsPage />);

    expect(screen.queryByText("React Basics")).not.toBeInTheDocument();
    expect(screen.queryByText("Zustand Store")).not.toBeInTheDocument();
    expect(screen.getByText("TanStack Query")).toBeInTheDocument();
  });
});