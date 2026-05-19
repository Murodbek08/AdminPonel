import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "./roleApi";

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await rolesApi.getAll();
      return data;
    },
  });
