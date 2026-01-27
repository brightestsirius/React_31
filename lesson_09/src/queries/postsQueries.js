import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import postsApi from "../api/postsApi";

export const usePostsQuery = () => {
  return useQuery({ queryKey: ["posts"], queryFn: () => postsApi.get() });
};

export const useDeletePostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => postsApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prev = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => {
        if (!Array.isArray(old)) return old;
        return old.filter((p) => p.id !== id);
      });

      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["posts"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => postsApi.put(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useCreatePostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => postsApi.post(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
