import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import service from "../services/posts.service";

import type { Post } from "../types/post"

export const usePostsQuery = () => {
  return useQuery<Post[]>({ queryKey: ["posts"], queryFn: service.list });
};

export const usePostDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prev = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData<Post[]>(["posts"], (old) => {
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

export const usePostUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Post) => service.put(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const usePostCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<Post, "id">) => service.post(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};