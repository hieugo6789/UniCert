import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Dropdown, Badge, List, Button, Avatar, Menu } from "antd";
import { allNotificationData } from "../../models/notification";
import useNotification from "../../hooks/Notification/useNotification";
import Cookies from "js-cookie";
import * as signalR from "@microsoft/signalr";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import agent from "../../utils/agent";
import { GoDotFill } from "react-icons/go";
import { TbDots } from "react-icons/tb";
import useDeleteNotification from "../../hooks/Notification/useDeleteNotification";

const AdminNotification = () => {
  const role = Cookies.get("role") || "";
  const { notification, loading, refetch } = useNotification({ role });
  const { handleDeleteNotification } = useDeleteNotification();
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hoveredNotificationId, setHoveredNotificationId] = useState<
    number | null
  >(null);

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

    connection.on("ReceiveNotification", () => {
      refetch(role);
    });

    // Start the connection
    connection.start().catch(() => {});

    return () => {
      connection.stop().catch(() => {});
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
  const handleReadNotification = async (notificationId: number) => {
    try {
      await agent.Notification.readNotification(notificationId);
      refetch(role);
    } catch (err) {
      console.log("Error updating notifications as read:", err);
    }
  };

  const handleMouseEnter = (id: number) => {
    setHoveredNotificationId(id);
  };

  const handleMouseLeave = () => {
    setHoveredNotificationId(null);
  };
  const handleDeleteClick = async (notificationId: number) => {
    try {
      await handleDeleteNotification(notificationId);
      refetch(role);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const recordViolation = async (notificationId: number) => {
    try {
      await agent.Notification.updateIsReadViolation(notificationId);
      refetch(role);
    } catch (err) {
      console.log("Error updating notifications as read:", err);
    }
  };

  const notificationList = (
    <div className="max-w-md bg-white shadow-lg rounded-lg overflow-y-auto max-h-[82vh] border border-gray-200 custom-scrollbar">
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
              View all
            </Button>
          </div>
          <List
            className="bg-white px-2"
            dataSource={notification}
            renderItem={(notif: allNotificationData) => {
              const vietnamTime = new Date(
                new Date(notif.creationDate).getTime() + 7 * 60 * 60 * 1000
              );
              return (
                <List.Item
                  onMouseEnter={() => handleMouseEnter(notif.notificationId)}
                  onMouseLeave={handleMouseLeave}
                  className={`border-b border-gray-100 last:border-none rounded-lg mb-1 ${
                    !notif.isRead ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex p-2 items-center relative">
                    <div className="flex">
                      <div>
                        <Avatar
                          src={
                            notif.notificationImage
                              ? notif.notificationImage
                              : defaultAvatar
                          }
                          alt={notif.notificationName}
                          className="size-12 mr-2"
                        />
                      </div>

                      <div className="">
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
                        {hoveredNotificationId === notif.notificationId && (
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item
                                  key="read"
                                  onClick={() =>
                                    handleReadNotification(notif.notificationId)
                                  }
                                >
                                  Mark as read
                                </Menu.Item>
                                {!notif.isRead && (
                                  <Menu.Item
                                    key="read"
                                    onClick={() =>
                                      recordViolation(notif.notificationId)
                                    }
                                  >
                                    Record violation for this user
                                  </Menu.Item>
                                )}
                                <Menu.Item
                                  key="delete"
                                  danger
                                  onClick={() =>
                                    handleDeleteClick(notif.notificationId)
                                  }
                                >
                                  Delete this message
                                </Menu.Item>
                              </Menu>
                            }
                            trigger={["click"]}
                            placement="bottomRight"
                          >
                            <div className="absolute top-1 right-2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full text-gray-600 cursor-pointer flex justify-center items-center w-6 h-6 shadow-sm">
                              <TbDots />
                            </div>
                          </Dropdown>
                        )}
                      </div>
                    </div>
                    {!notif.isRead && (
                      <div className="text-blue-600 mr-2">
                        <GoDotFill />
                      </div>
                    )}
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

export default AdminNotification;
