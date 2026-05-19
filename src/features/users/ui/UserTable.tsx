import { Table, Tag, Space, Button, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import type { User } from "@/shared/types";

interface UserTableProps {
  data: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const roleColors: Record<string, string> = {
  ADMIN: "red",
  PAYMENT: "blue",
  REPORTS: "green",
};

export default function UserTable({
  data,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  const { t } = useTranslation();

  const columns: ColumnsType<User> = [
    {
      title: "№",
      key: "index",
      width: 52,
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: t("users.firstName"),
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: t("users.lastName"),
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: t("users.email"),
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: t("users.roles"),
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <Space size={4} wrap>
          {roles.length ? (
            roles.map((role) => (
              <Tag key={role} color={roleColors[role] ?? "default"}>
                {role}
              </Tag>
            ))
          ) : (
            <Tag>—</Tag>
          )}
        </Space>
      ),
    },
    {
      title: t("common.actions"),
      key: "actions",
      width: 90,
      align: "center",
      fixed: "right",
      render: (_: unknown, record: User) => (
        <Space size={4}>
          <Tooltip title={t("common.edit")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title={t("users.deleteConfirm")}
            onConfirm={() => onDelete(record.id)}
            okText={t("common.yes")}
            cancelText={t("common.no")}
            okButtonProps={{ danger: true }}
            placement="topRight"
          >
            <Tooltip title={t("common.delete")}>
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 700 }}
      size="middle"
    />
  );
}
