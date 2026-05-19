import { Button, Input, Flex, Grid } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

interface UsersToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
  loading?: boolean;
}

export default function UsersToolbar({
  search,
  onSearch,
  onAdd,
  loading,
}: UsersToolbarProps) {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={8}
      style={{ marginBottom: 16 }}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder={t("common.search")}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
        disabled={loading}
        style={{ maxWidth: 320 }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAdd}
        disabled={loading}
      >
        {!isMobile && t("users.addUser")}
      </Button>
    </Flex>
  );
}
