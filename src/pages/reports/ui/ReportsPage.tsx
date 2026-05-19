import { useReports } from "@/entities/report";
import { PageSkeleton } from "@/shared/components";
import { getApiError } from "@/shared/utils";
import { Col, Row, Typography, Alert } from "antd";
import { useTranslation } from "react-i18next";
import ReportStatsCards from "./ReportStatsCards";
import RevenueChart from "./RevenueChart";
import PaymentsPieChart from "./PaymentsPieChart";

const { Title } = Typography;

export default function ReportsPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useReports();

  if (isLoading) {
    return (
      <div>
        <Title level={4} style={{ marginBottom: 16 }}>
          {t("reports.title")}
        </Title>
        <PageSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Title level={4} style={{ marginBottom: 16 }}>
          {t("reports.title")}
        </Title>
        <Alert
          type="error"
          message={getApiError(error, t("common.error"))}
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>
        {t("reports.title")}
      </Title>

      <Row gutter={[16, 16]}>
        {/* Stat kartalar */}
        <Col xs={24}>
          <ReportStatsCards
            totalUsers={data?.totalUsers ?? 0}
            totalPayments={data?.totalPayments ?? 0}
            successRate={data?.successRate ?? 0}
            loading={false}
          />
        </Col>

        {/* Bar chart */}
        <Col xs={24} lg={16}>
          <RevenueChart data={data?.monthlyRevenue ?? []} loading={false} />
        </Col>

        {/* Pie chart */}
        <Col xs={24} lg={8}>
          <PaymentsPieChart
            data={
              data?.paymentsByStatus ?? {
                success: 0,
                pending: 0,
                failed: 0,
              }
            }
            loading={false}
          />
        </Col>
      </Row>
    </div>
  );
}
