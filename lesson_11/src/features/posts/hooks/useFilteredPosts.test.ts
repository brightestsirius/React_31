import { describe, it, expect } from "vitest";
import { filterPosts } from "./useFilteredPosts";
import { POST_STATUS } from "../../../types/post";
import type { Post } from "../../../types/post";

describe("filterPosts", () => {
  const posts: Post[] = [
    { id: "1", title: "React Basics", body: "hooks", status: POST_STATUS.PUBLISHED },
    { id: "2", title: "Zustand Store", body: "client state", status: POST_STATUS.DRAFT },
    { id: "3", title: "TanStack Query", body: "cache", status: POST_STATUS.PUBLISHED },
  ];

  it("should return all posts when status is ALL and search is empty", () => {
    expect(filterPosts(posts, POST_STATUS.ALL, "")).toHaveLength(3);
  });

  it("should filter by status", () => {
    expect(filterPosts(posts, POST_STATUS.DRAFT, "").map((p) => p.id)).toEqual(["2"]);
  });

  it("should filter by search in title/body (case-insensitive)", () => {
    expect(filterPosts(posts, POST_STATUS.ALL, "react").map((p) => p.id)).toEqual(["1"]);
    expect(filterPosts(posts, POST_STATUS.ALL, "cache").map((p) => p.id)).toEqual(["3"]);
  });

  it("should combine status and search", () => {
    expect(filterPosts(posts, POST_STATUS.PUBLISHED, "query").map((p) => p.id)).toEqual(["3"]);
  });

  it("should ignore leading/trailing spaces", () => {
    expect(filterPosts(posts, POST_STATUS.ALL, "   react ").map((p) => p.id)).toEqual(["1"]);
  });
});