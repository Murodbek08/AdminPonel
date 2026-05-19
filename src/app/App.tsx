import AppRouter from "@/shared/router";
import { setNotificationApi } from "@/shared/utils";
import { App as AntApp, notification } from "antd";
import { useEffect } from "react";

function AppContent() {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setNotificationApi(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <AntApp>
      <AppContent />
    </AntApp>
  );
}
