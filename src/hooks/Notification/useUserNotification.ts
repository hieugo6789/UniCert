import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allNotificationData } from "../../models/notification";
import { fetchNotificationByUserId } from "../../redux/slice/Notification/userNotificationSlice";

interface useUserNotificationProps {
  userId: number;
}
const useUserNotification = ({ userId }: useUserNotificationProps) => {
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState<allNotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserNotifications = async (userId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchNotificationByUserId(userId));
      setNotification(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching notifications.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserNotifications(userId);
  }, []);

  return { notification, loading, refetch: fetchUserNotifications };
};
export default useUserNotification;
