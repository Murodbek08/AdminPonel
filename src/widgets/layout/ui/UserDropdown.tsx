import { Avatar, Dropdown, Space, Grid, type MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { notify } from "@/shared/utils";

const { useBreakpoint } = Grid;

export interface User {
  firstName: string;
  lastName: string;
  roles: string[];
}

interface UserDropdownProps {
  user: User | null;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const screens = useBreakpoint();

  const handleLogout = () => {
    logout();
    notify.success("Tizimdan chiqildi");
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Chiqish",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Space
        style={{
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "8px",
        }}
      >
        <Avatar
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1677ff" }}
        />

        {!screens.xs && (
          <span style={{ fontWeight: 500 }}>
            {user?.firstName} {user?.lastName}
          </span>
        )}
      </Space>
    </Dropdown>
  );
}
