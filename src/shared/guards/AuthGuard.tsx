import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const raw = localStorage.getItem("auth-storage");
  const token = raw ? JSON.parse(raw)?.state?.token : null;
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
