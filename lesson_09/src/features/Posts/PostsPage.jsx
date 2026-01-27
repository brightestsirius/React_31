import React from "react";
import { usePostsQuery } from "../../queries/postsQueries";

import PostsToolbar from "./PostsToolbar";
import PostsList from "./PostsList";
import PostsModal from "./PostsModal";

export default function PostsPage() {
  const { data: posts = [], isLoading, isError, error } = usePostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <PostsToolbar />
      <PostsList posts={posts} />
      <PostsModal posts={posts} />
    </>
  );
}
