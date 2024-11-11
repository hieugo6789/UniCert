import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Dropdown, Badge, List } from "antd";
import { allNotificationData } from "../../models/notification";
import useNotification from "../../hooks/Notification/useNotification";
import Cookies from "js-cookie";

const Notification = () => {
  const role = Cookies.get("role") || "Admin";
  const { notification, loading } = useNotification({ role });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notification.filter((notif) => !notif.isRead).length;
    setUnreadCount(count);
  }, [notification]);

  const notificationList = (
    <div style={{ maxWidth: "300px", padding: "10px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <List
          className="bg-white"
          dataSource={notification}
          renderItem={(notif: allNotificationData) => (
            <List.Item>
              <p>{notif.notificationDescription}</p>
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
    >
      <div style={{ position: "relative", cursor: "pointer" }}>
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
