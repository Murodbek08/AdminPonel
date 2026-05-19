import { Card, Col, Row, Statistic, Typography, Skeleton } from "antd";
import {
  TeamOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";

const { Text } = Typography;

interface ReportStatsCardsProps {
  totalUsers: number;
  totalPayments: number;
  successRate: number;
  loading: boolean;
}

export default function ReportStatsCards({
  totalUsers,
  totalPayments,
  successRate,
  loading,
}: ReportStatsCardsProps) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary, colorBorderSecondary },
  } = antTheme.useToken();

  const stats = [
    {
      title: t("reports.totalUsers"),
      value: totalUsers,
      suffix: t("dashboard.person"),
      icon: <TeamOutlined style={{ fontSize: 22, color: colorPrimary }} />,
      bgColor: "#e6f4ff",
    },
    {
      title: t("reports.totalPayments"),
      value: totalPayments,
      suffix: t("dashboard.count"),
      icon: <CreditCardOutlined style={{ fontSize: 22, color: "#52c41a" }} />,
      bgColor: "#f6ffed",
    },
    {
      title: t("reports.successRate"),
      value: successRate,
      suffix: "%",
      icon: <CheckCircleOutlined style={{ fontSize: 22, color: "#fa8c16" }} />,
      bgColor: "#fff7e6",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col xs={24} sm={8} key={stat.title}>
          <Card style={{ borderColor: colorBorderSecondary }}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
              <>
                <div
                  style={{
                    background: stat.bgColor,
                    borderRadius: 10,
                    padding: "10px 12px",
                    display: "inline-flex",
                    marginBottom: 12,
                  }}
                >
                  {stat.icon}
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
                  valueStyle={{ fontSize: 26, fontWeight: 700 }}
                />
              </>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
