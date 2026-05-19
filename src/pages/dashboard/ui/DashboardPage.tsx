import { Col, Row, Space, Typography, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";
import { useAuthStore, useMe } from "@/features/auth";
import { useUsers } from "@/entities/user";
import { usePayments } from "@/entities/payment";
import { useReports } from "@/entities/report";
import UserProfileCard from "./UserProfileCard";
import StatsCards from "./StatsCards";


const { Title, Text } = Typography;

export default function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const {
    token: { colorPrimary },
  } = antTheme.useToken();

  const isAdmin = user?.roles.includes("ADMIN") ?? false;
  const isPayment = user?.roles.includes("PAYMENT") || isAdmin;
  const isReports = user?.roles.includes("REPORTS") || isAdmin;

  const { data: meData, isLoading: meLoading } = useMe();

  const { data: usersData, isLoading: usersLoading } = useUsers(
    { page: 1, pageSize: 1 },
    { enabled: isAdmin },
  );

  const { data: paymentsData, isLoading: paymentsLoading } = usePayments(
    { page: 1, pageSize: 1 },
    { enabled: isPayment },
  );

  const { data: reportsData, isLoading: reportsLoading } = useReports({
    enabled: isReports,
  });

  const currentUser = meData ?? user;
  const statsLoading = usersLoading || paymentsLoading || reportsLoading;

  const usersTotal = isAdmin ? (usersData?.total ?? "—") : "—";
  const paymentsTotal = isPayment ? (paymentsData?.total ?? "—") : "—";
  const successRate = isReports ? (reportsData?.successRate ?? "—") : "—";

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          {t("dashboard.title")}
        </Title>
        <Text type="secondary">{t("dashboard.subtitle")}</Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={7} xl={6}>
          <UserProfileCard user={currentUser} loading={meLoading} />
        </Col>

        <Col xs={24} lg={17} xl={18}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <StatsCards
                isAdmin={isAdmin}
                isPayment={isPayment}
                isReports={isReports}
                usersTotal={usersTotal}
                paymentsTotal={paymentsTotal}
                successRate={successRate}
                loading={statsLoading}
              />
            </Col>

            {/* Xush kelibsiz banner */}
            <Col xs={24}>
              <Card
                style={{
                  background: `linear-gradient(135deg, ${colorPrimary}15, ${colorPrimary}30)`,
                  borderColor: `${colorPrimary}40`,
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      background: colorPrimary,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <UserOutlined style={{ color: "#fff", fontSize: 18 }} />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 15 }}>
                      {t("dashboard.greeting")},{" "}
                      {currentUser?.firstName ?? t("dashboard.user")}!
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {t("dashboard.greetingMsg")}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
