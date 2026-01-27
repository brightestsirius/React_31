import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import postsApi from "../api/postsApi";

export const usePostsQuery = () => {
  return useQuery({ queryKey: ["posts"], queryFn: () => postsApi.get() });
};

export const useDeletePostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => postsApi.delete(id),
    onSuccess: () => {
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
