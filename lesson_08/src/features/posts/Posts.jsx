import React, { useState } from "react";

import {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLazyGetPostsTitleQuery,
} from "../../store/services/posts";

export default function Posts() {
  const {
    data: posts,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [changePost] = useUpdatePostMutation();
  const [addPost] = useAddPostMutation();

  const {
    titles,
    isLoading: isLoadingTitles,
    isFetching: isFetchingTitles,
    error: errorTitles,
  } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      titles: data?.map((post) => post.title) || [],
      isLoading,
      isFetching,
      error,
    }),
  });

  const [postId, setPostId] = useState();
  const {
    data: dataPost,
    isLoading: isLoadingPost,
    error: errorPost,
  } = useGetPostQuery(postId, { skip: !postId });

  const [
    getPostsTitle,
    { data: postsTitle, isLoading: isLoadingPostsTitle, error: errorPostsTitle },
  ] = useLazyGetPostsTitleQuery();

  const handlePostTitle = (item) => {
    changePost({ id: item.id, title: item.title + `!` });
  };

  const handleAddPost = () => {
    const title = prompt(`Enter title`, `New title`);
    addPost({ title });
  };

  const getPostById = () => {
    const id = +prompt(`Enter post id`, 10);
    setPostId(id);
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (isFetching && !isLoading) return <p>Updating posts...</p>;
  if (error) return <p>Oops {error.toString()}</p>;

  return (
    <div style={{ margin: "10px 0" }}>
      <button onClick={handleAddPost}>Add post</button>
      <button onClick={refetch}>Refetch</button>
      <button onClick={() => getPostsTitle()}>Get posts title</button>

      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            {item.title}{" "}
            <button onClick={() => deletePost(item.id)}>Delete</button>
            <button onClick={() => handlePostTitle(item)}>Change title</button>
          </li>
        ))}
      </ul>

      <hr></hr>

      {isLoadingTitles && <p>Loading titles...</p>}
      {isFetchingTitles && !isLoadingTitles && <p>Updating titles...</p>}
      <ul>
        {titles.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />
      {isLoadingPostsTitle && <p>Loading titles...</p>}
      {postsTitle ? (
        <ul>
          {postsTitle.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}

      <button onClick={getPostById}>Get post by id</button>

      {isLoadingPost && <p>Post loading...</p>}
      {errorPost && <p>Oops {errorPost.toString()}...</p>}
      {dataPost && <h4>{dataPost.title}</h4>}
    </div>
  );
}
