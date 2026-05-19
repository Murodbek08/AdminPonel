import { api } from "@/shared/api";
import type { User } from "@/shared/types";

export const usersApi = {
  getAll: (params?: { page?: number; pageSize?: number; search?: string }) =>
    api.get("/api/users", { params }),
  create: (data: Omit<User, "id">) => api.post("/api/users", data),
  update: (id: number, data: Partial<Omit<User, "id">>) =>
    api.put(`/api/users/${id}`, data),
  remove: (id: number) => api.delete(`/api/users/${id}`),
};
