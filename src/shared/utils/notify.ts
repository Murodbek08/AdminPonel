import type { NotificationInstance } from "antd/es/notification/interface";

let notificationApi: NotificationInstance;

export const setNotificationApi = (api: NotificationInstance) => {
  notificationApi = api;
};

export const notify = {
  success: (message: string) =>
    notificationApi?.success({ message, placement: "topRight" }),
  error: (message: string) =>
    notificationApi?.error({ message, placement: "topRight" }),
};
