import { Card, Col, Row, Statistic, Tag, Typography, Skeleton } from "antd";
import {
  TeamOutlined,
  CreditCardOutlined,
  RiseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";

const { Text } = Typography;

interface StatsCardsProps {
  usersTotal: number | string;
  paymentsTotal: number | string;
  successRate: number | string;
  loading: boolean;
  isAdmin: boolean;
  isPayment: boolean;
  isReports: boolean;
}

export default function StatsCards({
  usersTotal,
  paymentsTotal,
  successRate,
  loading,
  isAdmin,
  isPayment,
  isReports,
}: StatsCardsProps) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary, colorBorderSecondary },
  } = antTheme.useToken();

  const stats = [
    {
      show: isAdmin,
      title: t("dashboard.totalUsers"),
      value: usersTotal,
      icon: <TeamOutlined style={{ fontSize: 24, color: colorPrimary }} />,
      bgColor: "#e6f4ff",
      suffix: t("dashboard.person"),
      trend: "+12%",
    },
    {
      show: isPayment,
      title: t("dashboard.totalPayments"),
      value: paymentsTotal,
      icon: <CreditCardOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      bgColor: "#f6ffed",
      suffix: t("dashboard.count"),
      trend: "+8%",
    },
    {
      show: isReports,
      title: t("dashboard.successRate"),
      value: successRate,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#fa8c16" }} />,
      bgColor: "#fff7e6",
      suffix: "%",
      trend: "+3%",
    },
  ].filter((s) => s.show);

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col
          xs={24}
          sm={stats.length === 1 ? 24 : 12}
          md={24 / stats.length}
          key={stat.title}
        >
          <Card style={{ borderColor: colorBorderSecondary }}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      background: stat.bgColor,
                      borderRadius: 10,
                      padding: "10px 12px",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <Tag
                    icon={<RiseOutlined />}
                    color="success"
                    style={{ margin: 0 }}
                  >
                    {stat.trend}
                  </Tag>
                </div>
                <Statistic
                  title={
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {stat.title}
                    </Text>
                  }
                  value={stat.value}
                  suffix={
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {stat.suffix}
                    </Text>
                  }
                  valueStyle={{ fontSize: 28, fontWeight: 700 }}
                />
              </>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
