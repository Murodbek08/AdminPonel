import { api } from "@/shared/api";

export const paymentsApi = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    userId?: number;
    search?: string;
  }) => api.get("/api/payments", { params }),
};
