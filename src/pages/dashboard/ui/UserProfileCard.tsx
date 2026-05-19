import {
  Card,
  Avatar,
  Typography,
  Tag,
  Divider,
  Space,
  Badge,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { theme as antTheme } from "antd";
import type { User } from "@/shared/types";

const { Title, Text, Paragraph } = Typography;

interface UserProfileCardProps {
  user: User | null;
  loading: boolean;
}

export default function UserProfileCard({
  user,
  loading,
}: UserProfileCardProps) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary, colorBorderSecondary, colorTextSecondary },
  } = antTheme.useToken();

  return (
    <Card style={{ borderColor: colorBorderSecondary, height: "100%" }}>
      {loading ? (
        <Skeleton avatar paragraph={{ rows: 4 }} active />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Badge
            dot
            status="success"
            offset={[-6, 6]}
            style={{ width: 12, height: 12 }}
          >
            <Avatar
              size={80}
              icon={<UserOutlined />}
              style={{ background: colorPrimary, fontSize: 36 }}
            />
          </Badge>

          <Title level={4} style={{ margin: "12px 0 4px" }}>
            {user ? `${user.firstName} ${user.lastName}` : "—"}
          </Title>

          <Space size={4} style={{ marginBottom: 12 }}>
            <MailOutlined style={{ color: colorTextSecondary }} />
            <Text type="secondary">{user?.email ?? "—"}</Text>
          </Space>

          <Divider style={{ margin: "12px 0" }} />

          <div style={{ textAlign: "left" }}>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 8 }}
            >
              <SafetyCertificateOutlined style={{ marginRight: 6 }} />
              {t("dashboard.roles")}
            </Text>
            <Space wrap>
              {user?.roles?.length ? (
                user.roles.map((role) => (
                  <Tag key={role} color="blue">
                    {role}
                  </Tag>
                ))
              ) : (
                <Tag>—</Tag>
              )}
            </Space>
          </div>

          <Divider style={{ margin: "12px 0" }} />

          <Paragraph
            type="secondary"
            style={{ fontSize: 12, margin: 0, textAlign: "left" }}
          >
            {t("dashboard.welcomeMsg")}
          </Paragraph>
        </div>
      )}
    </Card>
  );
}
