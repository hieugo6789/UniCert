import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allNotificationData } from "../../models/notification";
import { fetchAllNotification } from "../../redux/slice/Notification/notificationSlice";

interface UseNotificationProps {
  role: string;
}
const useNotification = ({ role }: UseNotificationProps) => {
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState<allNotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotifications = async (role: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllNotification(role));
      setNotification(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching notifications.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications(role);
  }, []);

  return { notification, loading, refetch: fetchNotifications };
};
export default useNotification;
