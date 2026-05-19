import { useAuthStore } from "@/features/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
