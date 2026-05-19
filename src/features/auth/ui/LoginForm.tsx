import { Form, Input, Button, Card, Typography, theme as antTheme } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../model/authStore";
import { authApi } from "../api/authApi";
import { notify } from "@/shared/utils";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);

  const {
    token: { colorBgContainer },
  } = antTheme.useToken();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const { data } = await authApi.login(values);
      setAuth(data.token, data.user);

      notify.success(t("auth.loginSuccess"));
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const e = err as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (e.response?.status === 403) {
        navigate("/403", { replace: true });
        return;
      }

      const message = e.response?.data?.message ?? t("common.error");
      notify.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 16px",
        background: colorBgContainer,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        {t("auth.title")}
      </Title>

      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t("auth.emailRequired") },
            { type: "email", message: t("auth.emailInvalid") },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t("auth.emailPlaceholder")}
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: t("auth.passwordRequired") },
            { min: 6, message: t("auth.passwordMin") },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t("auth.passwordPlaceholder")}
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            {t("auth.loginBtn")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
