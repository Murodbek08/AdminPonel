import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmDelete({ onConfirm, loading }: Props) {
  return (
    <Popconfirm
      title="O'chirishni tasdiqlang"
      description="Haqiqatan ham o'chirmoqchimisiz?"
      onConfirm={onConfirm}
      okText="Ha"
      cancelText="Yo'q"
      okButtonProps={{ danger: true, loading }}
    >
      <Button danger icon={<DeleteOutlined />} size="small" />
    </Popconfirm>
  );
}
