import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "./reportApi";

export const useReports = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await reportsApi.get();
      return data;
    },
    enabled: options?.enabled ?? true,
  });
