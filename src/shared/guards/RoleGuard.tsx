import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: Props) {
  const raw = localStorage.getItem("auth-storage");
  const user = raw ? JSON.parse(raw)?.state?.user : null;
  const hasRole = user?.roles.some((r: string) => allowedRoles.includes(r));
  if (!hasRole) return <Navigate to="/403" replace />;
  return <Outlet />;
}
