import React, { useState } from "react";

import {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsTitlesQuery,
  useLazyGetPostsTitlesQuery
} from "../../store/services/posts";

export default function Posts() {
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addPost] = useAddPostMutation();

  const [postId, setPostId] = useState();
  const { data: post } = useGetPostQuery(postId, { skip: !postId });

  // const { titles, isLoading: titlesLoading, error: titlesError } = useGetPostsQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     titles: data?.map((p) => p.title) || [],
  //     isLoading,
  //     error
  //   })
  // });

  // const [fetchTitle, setFetchTitles] = useState(false);
  // const {data: titles} = useGetPostsTitlesQuery(undefined, {skip: !fetchTitle});

  const [getTitles, {data: titles, isLoading: titlesLoading, error: titlesError }] = useLazyGetPostsTitlesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops: {error}</p>;

  const changeChange = (item) => {
    const title = prompt(`Enter post title`, `New title`);
    updatePost({ id: item.id, title });
  };

  const handleAdd = () => {
    const title = prompt(`Enter post title`, `New title`);
    addPost({ title });
  };

  const handlePost = () => {
    const id = +prompt(`Enter post id`, 10);
    setPostId(id);
  };

  return (
    <div style={{ margin: `10px 0` }}>
      <button onClick={refetch}>Refetch</button>
      <button onClick={handleAdd}>Add new post</button>
      <button onClick={handlePost}>Get post info by id</button>
      <button onClick={() => getTitles()}>Get posts titles</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}{" "}
            <button onClick={() => changeChange(item)}>Change title</button>
            <button onClick={() => deletePost(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {post ? (
        <div>
          <h3>{post.title}</h3>
        </div>
      ) : null}

      {titlesLoading && <p>Loading titles...</p>}
      {titlesError && <p>Error loading titles: {titlesError.toString()}</p>}

      {titles ? (
        <ul>
          {titles.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
