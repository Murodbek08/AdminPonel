import { Input, Select, Flex, Grid } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

interface PaymentsToolbarProps {
  search: string;
  status: string;
  onSearch: (value: string) => void;
  onStatus: (value: string) => void;
  loading?: boolean;
}

const STATUS_OPTIONS = [
  { value: "", label: "payments.allStatuses" },
  { value: "success", label: "payments.success" },
  { value: "pending", label: "payments.pending" },
  { value: "failed", label: "payments.failed" },
];

export default function PaymentsToolbar({
  search,
  status,
  onSearch,
  onStatus,
  loading,
}: PaymentsToolbarProps) {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <Flex
      gap={8}
      wrap={isMobile ? "wrap" : "nowrap"}
      style={{ marginBottom: 16 }}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder={t("common.search")}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
        disabled={loading}
        style={{ flex: 1, minWidth: 160 }}
      />
      <Select
        value={status}
        onChange={onStatus}
        disabled={loading}
        style={{ width: isMobile ? "100%" : 180 }}
        options={STATUS_OPTIONS.map((o) => ({
          value: o.value,
          label: t(o.label),
        }))}
      />
    </Flex>
  );
}
