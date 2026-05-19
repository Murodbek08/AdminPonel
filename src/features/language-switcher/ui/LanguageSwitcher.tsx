import { Dropdown, Button, type MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items: MenuProps["items"] = [
    { key: "uz", label: "O'zbekcha", onClick: () => changeLanguage("uz") },
    { key: "ru", label: "Русский", onClick: () => changeLanguage("ru") },
    { key: "en", label: "English", onClick: () => changeLanguage("en") },
  ];

  return (
    <Dropdown
      menu={{ items, selectedKeys: [i18n.language] }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        shape="circle"
        icon={<GlobalOutlined />}
        style={{
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Dropdown>
  );
};
