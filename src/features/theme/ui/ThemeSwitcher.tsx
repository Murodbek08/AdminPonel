import { Button } from "antd";
import { SunOutlined, MoonFilled } from "@ant-design/icons";
import { useThemeStore } from "../model/themeStore";

export const ThemeSwitcher = () => {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <Button
      type="text"
      shape="circle"
      icon={isDarkMode ? <SunOutlined /> : <MoonFilled />}
      onClick={toggleTheme}
      style={{ fontSize: "18px" }}
    />
  );
};
