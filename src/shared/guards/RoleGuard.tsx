import { useAuthStore } from "@/features/auth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: Props) {
  const user = useAuthStore((s) => s.user);
  const hasRole = user?.roles.some((r) => allowedRoles.includes(r));
  if (!hasRole) return <Navigate to="/403" replace />;
  return <Outlet />;
}
