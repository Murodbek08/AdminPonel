import { Card, Skeleton } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";

interface MonthlyRevenue {
  month: string;
  amount: number;
}

interface RevenueChartProps {
  data: MonthlyRevenue[];
  loading: boolean;
}

export default function RevenueChart({ data, loading }: RevenueChartProps) {
  const { t } = useTranslation();
  const {
    token: {
      colorPrimary,
      colorBorderSecondary,
      colorBgContainer,
      colorText,
      colorTextSecondary,
    },
  } = antTheme.useToken();

  return (
    <Card
      title={t("reports.monthlyRevenue")}
      style={{ borderColor: colorBorderSecondary }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colorBorderSecondary}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: colorTextSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: colorTextSecondary, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1_000_000 ? `${v / 1_000_000}M` : `${v / 1000}K`
              }
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: colorBgContainer,
                border: `1px solid ${colorBorderSecondary}`,
                borderRadius: 8,
                color: colorText,
              }}
              formatter={(value: any) =>
                [
                  `${value.toLocaleString()} UZS`,
                  t("reports.monthlyRevenue"),
                ] as const
              }
            />
            <Bar
              dataKey="amount"
              fill={colorPrimary}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
