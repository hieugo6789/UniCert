import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Dropdown, Badge, List } from "antd";
import { allNotificationData } from "../../models/notification";
import useNotification from "../../hooks/Notification/useNotification";
import Cookies from "js-cookie";
import agent from "../../utils/agent";
import io from "socket.io-client";

const Notification = () => {
  const role = Cookies.get("role") || "Admin";
  const { notification, loading, refetch } = useNotification({ role });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socket = io("https://uni-cert.vercel.app/");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("notificationUpdate", () => {
      console.log("Received notification update");
      refetch(role);
    });

    return () => {
      socket.off("notificationUpdate");
      socket.disconnect();
    };
  }, [refetch, role]);

  useEffect(() => {
    const count = notification.filter((notif) => !notif.isRead).length;
    setUnreadCount(count);
  }, [notification]);

  const handleDropdownVisibilityChange = async (visible: boolean) => {
    if (!visible) {
      try {
        await agent.Notification.updateIsRead(role);
        refetch(role);
      } catch (err) {
        console.log("Error updating notifications as read:", err);
      }
    }
  };
  const notificationList = (
    <div className="max-w-xs p-4 bg-white shadow-lg rounded-lg overflow-y-auto max-h-80 border border-gray-200">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <List
          className="bg-white"
          dataSource={notification}
          renderItem={(notif: allNotificationData) => (
            <List.Item
              className={`py-2 border-b border-gray-100 last:border-none ${
                !notif.isRead ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              <p className="text-gray-700">{notif.notificationDescription}</p>
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <Dropdown
      overlay={notificationList}
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={handleDropdownVisibilityChange}
    >
      <div className="relative cursor-pointer">
        <Badge
          count={unreadCount}
          offset={[-10, 10]}
        >
          <IoMdNotificationsOutline className="size-8" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default Notification;
