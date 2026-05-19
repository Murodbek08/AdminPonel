import { Empty } from "antd";

interface Props {
  text?: string;
}

export default function EmptyState({ text = "Ma'lumot topilmadi" }: Props) {
  return <Empty description={text} />;
}
