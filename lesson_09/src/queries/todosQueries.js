import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import service from "../api/todosApi";

export const useTodosQuery = () => {
  return useQuery({ queryKey: ["todos"], queryFn: () => service.get() });
};

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => service.post(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => service.put(item.id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
