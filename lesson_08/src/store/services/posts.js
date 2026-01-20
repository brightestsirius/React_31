import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://694eda01b5bc648a93c1705e.mockapi.io/",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addPost: build.mutation({
      query(body) {
        return {
          url: `posts`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: build.mutation({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    getPostsTitle: build.query({
      query: () => "posts",
      transformResponse: data => data.map(item => item.title),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsTitleQuery,
  useLazyGetPostsTitleQuery,
  useLazyGetPostQuery
} = postApi;
