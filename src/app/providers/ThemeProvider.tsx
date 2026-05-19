import { useThemeStore } from "@/features/theme";
import { ConfigProvider, theme } from "antd";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
