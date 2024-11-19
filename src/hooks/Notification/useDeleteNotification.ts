import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteNotificationFailure,
  deleteNotificationStart,
  deleteNotificationSuccess,
} from "../../redux/slice/Notification/deleteNotificationSlice";

import agent from "../../utils/agent";

const useDeleteNotification = () => {
  const state = useAppSelector((state) => state.deleteNotification);
  const dispatch = useAppDispatch();

  const handleDeleteNotification = async (notificationId: number) => {
    dispatch(deleteNotificationStart());
    try {
      const response = await agent.Notification.deleteNotification(
        notificationId
      );
      dispatch(deleteNotificationSuccess(response.data));
    } catch (error) {
      console.error("Error deleting notification:", error);
      dispatch(deleteNotificationFailure());
    }
  };
  return { state, handleDeleteNotification };
};
export default useDeleteNotification;
