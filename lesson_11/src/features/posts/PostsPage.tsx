import { useMemo } from "react";

import PostsToolbar from "./PostsToolbar";
import PostsList from "./PostsList";
import PostsModal from "./PostsModal";

import { usePostsQuery } from "../../queries/postQueries";
import usePostsStore from "../../store/usePostsStore";

import { useFilteredPosts } from "./hooks/useFilteredPosts";

export default function PostsPage() {
  const { data: posts = [], isLoading, isError, error } = usePostsQuery();

  const filterStatus = usePostsStore(s => s.filterStatus);
  const search = usePostsStore(s => s.search);

  const filtered = useFilteredPosts(posts, filterStatus, search);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const message = error instanceof Error ? error.message : `Unknown error`;
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
