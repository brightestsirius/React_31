import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import service from "../services/posts.service";

export const usePostsQuery = () => {
  return useQuery({ queryKey: ["posts"], queryFn: () => service.get() });
};

export const usePostDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => service.delete(id),
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

export const usePostUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => service.put(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const usePostCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => service.post(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};