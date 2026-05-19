import { api } from "@/shared/api";

export const rolesApi = {
  getAll: () => api.get("/api/roles"),
};
