import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import service from "../services/posts.service";

import type { Post } from "../types/post"

const POST_KEYS = ["posts"];

export const usePostsQuery = () => {
  return useQuery<Post[]>({ queryKey: POST_KEYS, queryFn: service.list });
};

export const usePostDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: POST_KEYS });
      const prev = queryClient.getQueryData<Post[]>(POST_KEYS);

      queryClient.setQueryData<Post[]>(POST_KEYS, (old) => {
        if (!Array.isArray(old)) return old;
        return old.filter((p) => p.id !== id);
      });

      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(POST_KEYS, ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: POST_KEYS });
    },
  });
};

export const usePostUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Post) => service.put(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_KEYS });
    },
  });
};

export const usePostCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<Post, "id">) => service.post(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_KEYS });
    },
  });
};