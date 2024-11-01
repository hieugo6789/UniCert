import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteScheduleFailure,
  deleteScheduleStart,
  deleteScheduleSuccess,
} from "../../redux/slice/Schedule/deleteScheduleSlice";
import agent from "../../utils/agent";

const useDeleteSchedule = () => {
  const state = useAppSelector((state) => state.deleteSchedule);
  const dispatch = useAppDispatch();

  const handleDeleteSchedule = async (sessionId: number) => {
    dispatch(deleteScheduleStart());
    try {
      const response = await agent.Schedule.deleteSchedule(sessionId);
      dispatch(deleteScheduleSuccess(response.data));
    } catch (error) {
      console.error("Error deleting schedule:", error);
      dispatch(deleteScheduleFailure());
    }
  };
  return { state, handleDeleteSchedule };
};
export default useDeleteSchedule;
