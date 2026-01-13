"use client";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import useSWR from "swr";
import NotificationItem from "./NotificationItem";
import { NotificationData } from "@/types/notification";
import { markNotificationRead } from "../../actions";

// 通知データを取得して既読にする関数
const getAndReadNotifications = async (): Promise<
  NotificationData[] | null
> => {
  const res = await fetchWrapper.get(ApiRoutes.notification.default);
  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const notifications: NotificationData[] = await res.json();

  const ids = notifications.map((n) => n.id);
  await markNotificationRead(ids);

  return notifications;
};

function NotificationList() {
  const { data } = useSWR(
    ApiRoutes.notification.default,
    getAndReadNotifications,
    {
      suspense: true,
    }
  );

  if (!data || data.length === 0) {
    return <div className="px-6">通知はありません</div>;
  }

  return (
    <div className="px-6">
      <ul className="flex flex-col gap-2">
        {data.map((notification) => (
          <NotificationItem key={notification.id} data={notification} />
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;
