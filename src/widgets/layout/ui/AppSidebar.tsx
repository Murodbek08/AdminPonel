import {
  Layout,
  Menu,
  Drawer,
  Grid,
  theme as antTheme,
  type MenuProps,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CreditCardOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/features/auth";
import { useThemeStore } from "@/features/theme";


const { Sider } = Layout;
const { useBreakpoint } = Grid;

interface AppSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AppSidebar({
  collapsed,
  setCollapsed,
}: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const screens = useBreakpoint();
  const isMobile = Boolean((screens.xs || screens.sm) && !screens.lg);

  const { token } = antTheme.useToken();
  const siderTheme = isDarkMode ? "dark" : "light";

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: t("sidebar.dashboard"),
    },
    user?.roles?.includes("ADMIN") && {
      key: "/users",
      icon: <UserOutlined />,
      label: t("sidebar.users"),
    },
    user?.roles?.includes("PAYMENT") && {
      key: "/payments",
      icon: <CreditCardOutlined />,
      label: t("sidebar.payments"),
    },
    user?.roles?.includes("REPORTS") && {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: t("sidebar.reports"),
    },
  ].filter(Boolean) as MenuProps["items"];

  const menuContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: siderTheme === "dark" ? "#fff" : "#000",
          fontSize: 18,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {collapsed && !isMobile ? "A" : t("sidebar.adminPanel")}
      </div>
      <Menu
        theme={siderTheme}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          if (isMobile) setCollapsed(true);
        }}
        style={{ borderRight: 0, background: "transparent" }}
      />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setCollapsed(true)}
        open={!collapsed}
        styles={{ body: { padding: 0 } }}
        width={240}
      >
        {menuContent}
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      theme={siderTheme}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        background: token.colorBgContainer,
      }}
    >
      {menuContent}
    </Sider>
  );
}
