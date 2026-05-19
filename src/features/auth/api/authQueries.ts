import { useQuery } from "@tanstack/react-query";
import { authApi } from "./authApi";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await authApi.me();
      return data;
    },
  });
