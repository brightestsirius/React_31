import { useMemo } from "react";

import PostsToolbar from "./PostsToolbar";
import PostsList from "./PostsList";
import PostsModal from "./PostsModal";

import { usePostsQuery } from "../../queries/postQueries";
import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from "../../types/post";

export default function PostsPage() {
  const { data: posts = [], isLoading, isError, error } = usePostsQuery();

  const status = usePostsStore((s) => s.status);
  const search = usePostsStore((s) => s.search);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesText =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.body?.toLowerCase().includes(q);

      const matchesStatus =
        status === POST_STATUS.ALL ? true : p.status === status;

      return matchesText && matchesStatus;
    });
  }, [posts, search, status]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <p>Error: {message}</p>;
  }

  return (
    <>
      <PostsToolbar />
      <PostsList posts={filtered} />
      <PostsModal posts={posts} />
    </>
  );
}
