import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { theme as antTheme } from "antd";
import { LoginForm, useAuthStore } from "@/features/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  const {
    token: { colorBgLayout },
  } = antTheme.useToken();

  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
  }, [token, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colorBgLayout,
      }}
    >
      <LoginForm />
    </div>
  );
}
