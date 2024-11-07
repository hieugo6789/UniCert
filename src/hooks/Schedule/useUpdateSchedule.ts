import { updateSchedule } from "../../models/schedule";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailScheduleFailure,
  UpdateDetailScheduleStart,
  UpdateDetailScheduleSuccess,
} from "../../redux/slice/Schedule/scheduleDetailSlice";
import agent from "../../utils/agent";

const useUpdateSchedule = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.scheduleDetail);

  const updateSchedule = async (sessionId: number, data: updateSchedule) => {
    dispatch(UpdateDetailScheduleStart());
    try {
      const response = await agent.Schedule.updateScheduleDetail(
        sessionId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailScheduleSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailScheduleFailure(
          error.message || "Failed to update Schedule"
        )
      );
    }
  };

  return {
    updateSchedule,
    state,
  };
};
export default useUpdateSchedule;
