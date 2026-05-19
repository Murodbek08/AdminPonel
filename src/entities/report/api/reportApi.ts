import { api } from "@/shared/api";

export const reportsApi = {
  get: () => api.get("/api/reports"),
};
