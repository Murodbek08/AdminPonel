import { Card, Skeleton } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";

interface PaymentsByStatus {
  success: number;
  pending: number;
  failed: number;
}

interface PaymentsPieChartProps {
  data: PaymentsByStatus;
  loading: boolean;
}

const COLORS = ["#52c41a", "#faad14", "#ff4d4f"];

export default function PaymentsPieChart({
  data,
  loading,
}: PaymentsPieChartProps) {
  const { t } = useTranslation();
  const {
    token: { colorBorderSecondary, colorBgContainer, colorText },
  } = antTheme.useToken();

  const chartData = [
    { name: t("payments.success"), value: data.success },
    { name: t("payments.pending"), value: data.pending },
    { name: t("payments.failed"), value: data.failed },
  ];

  return (
    <Card
      title={t("reports.paymentsByStatus")}
      style={{ borderColor: colorBorderSecondary, height: "100%" }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: colorBgContainer,
                border: `1px solid ${colorBorderSecondary}`,
                borderRadius: 8,
                color: colorText,
              }}
              formatter={(value: any) => [value, ""] as const}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span style={{ color: colorText, fontSize: 13 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
