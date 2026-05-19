import { Layout, Button, theme as antTheme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/features/auth";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/features/theme";
import UserDropdown from "./UserDropdown";

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AppHeader({ collapsed, setCollapsed }: AppHeaderProps) {
  const user = useAuthStore((s) => s.user);
  const {
    token: { colorBgContainer },
  } = antTheme.useToken();

  return (
    <Header
      style={{
        background: colorBgContainer,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: "16px", width: 48, height: 48, marginLeft: -8 }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <LanguageSwitcher />
        <ThemeSwitcher />
        <UserDropdown user={user} />
      </div>
    </Header>
  );
}
