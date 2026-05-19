import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { usersApi } from "./userApi";
import type { User } from "@/shared/types";

export const useUsers = (
  params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  },
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const { data } = await usersApi.getAll(params);
      return data;
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<User, "id">) => {
      const { data } = await usersApi.create(payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data: payload,
    }: {
      id: number;
      data: Partial<Omit<User, "id">>;
    }) => {
      const { data } = await usersApi.update(id, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await usersApi.remove(id);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
