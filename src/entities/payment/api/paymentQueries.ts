import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { paymentsApi } from "./paymentApi";

export const usePayments = (
  params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    userId?: number;
    search?: string;
  },
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: ["payments", params],
    queryFn: async () => {
      const { data } = await paymentsApi.getAll(params);
      return data;
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
