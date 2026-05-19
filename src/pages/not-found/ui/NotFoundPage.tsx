import { Result, Button, Row, Col, theme as antTheme } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { token } = antTheme.useToken();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: token.colorBgLayout,
      }}
    >
      <Col>
        <Result
          status="404"
          title="404"
          subTitle={t("notFound.subTitle")}
          extra={
            <Button type="primary" onClick={handleGoHome} size="large">
              {t("notFound.backHome")}
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
