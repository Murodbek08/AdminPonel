import { Button, Result, theme as antTheme } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ForbiddenPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = antTheme.useToken();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colorBgContainer,
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle={t("forbidden.subTitle")}
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            {t("forbidden.backHome")}
          </Button>
        }
      />
    </div>
  );
}
