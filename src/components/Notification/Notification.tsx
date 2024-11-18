import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Dropdown, Badge, List, Button } from "antd";
import { allNotificationData } from "../../models/notification";
import useNotification from "../../hooks/Notification/useNotification";
import Cookies from "js-cookie";
import agent from "../../utils/agent";
import * as signalR from "@microsoft/signalr";
import defaultNotification from "../../assets/images/defaultNoti.png";

const Notification = () => {
  const role = Cookies.get("role") || "";
  const { notification, loading, refetch } = useNotification({ role });
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        "https://certificateinformationportal.azurewebsites.net/notificationHub",
        {
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.LongPolling |
            signalR.HttpTransportType.ServerSentEvents,
          withCredentials: true,
        }
      )
      .configureLogging(signalR.LogLevel.Information) // Logs errors for debugging.
      .build();

    connection.on("ReceiveNotification", (message: string) => {
      console.log("Received notification:", message);
      refetch(role);
    });

    // Start the connection
    connection
      .start()
      .then(() => console.log("Connected to SignalR server"))
      .catch((err) => {
        console.error("SignalR connection error:", err);
      });

    return () => {
      connection
        .stop()
        .catch((err) => console.error("SignalR disconnection error:", err));
    };
  }, [refetch, role]);

  useEffect(() => {
    const count = notification.filter((notif) => !notif.isRead).length;
    setUnreadCount(count);
  }, [notification]);

  const handleDropdownVisibilityChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await agent.Notification.updateIsRead(role);
      refetch(role);
      setDropdownVisible(false);
    } catch (err) {
      console.log("Error updating notifications as read:", err);
    }
  };

  const notificationList = (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-y-auto max-h-[82vh] border border-gray-200 custom-scrollbar">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="ml-5 text-xl font-bold text-gray-800  mt-4 flex justify-between">
            <span>Notification</span>
            <Button
              type="link"
              className="text-blue-500 cursor-pointer"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
          <List
            className="bg-white pl-2"
            dataSource={notification}
            renderItem={(notif: allNotificationData) => {
              const vietnamTime = new Date(
                new Date(notif.creationDate).getTime() + 7 * 60 * 60 * 1000
              );
              return (
                <List.Item
                  className={`border-b border-gray-100 last:border-none rounded-lg mb-1 ${
                    !notif.isRead ? "bg-blue-100 font-semibold" : ""
                  }`}
                >
                  <div className="flex p-2 ">
                    <img
                      src={
                        notif.notificationImage
                          ? notif.notificationImage
                          : defaultNotification
                      }
                      alt={notif.notificationName}
                      className="size-12 mr-2"
                    />
                    <div>
                      <p className="text-gray-700">
                        {notif.notificationDescription}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {vietnamTime.toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </>
      )}
    </div>
  );

  return (
    <Dropdown
      overlay={notificationList}
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={handleDropdownVisibilityChange}
      open={dropdownVisible}
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
