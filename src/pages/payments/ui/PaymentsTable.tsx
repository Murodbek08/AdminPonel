import type { Payment } from "@/shared/types";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

interface PaymentsTableProps {
  data: Payment[];
  loading: boolean;
}

const statusColors: Record<string, string> = {
  success: "success",
  pending: "warning",
  failed: "error",
};

export default function PaymentsTable({ data, loading }: PaymentsTableProps) {
  const { t } = useTranslation();

  const columns: ColumnsType<Payment> = [
    {
      title: "№",
      key: "index",
      width: 52,
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: t("payments.description"),
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: t("payments.amount"),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: Payment) =>
        `${amount.toLocaleString()} ${record.currency}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t("payments.status"),
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) => (
        <Tag color={statusColors[status] ?? "default"}>
          {t(`payments.${status}`)}
        </Tag>
      ),
    },
    {
      title: t("payments.date"),
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 500 }}
      size="middle"
      locale={{
        triggerDesc: t("common.sortDesc"),
        triggerAsc: t("common.sortAsc"),
        cancelSort: t("common.cancelSort"),
      }}
    />
  );
}
