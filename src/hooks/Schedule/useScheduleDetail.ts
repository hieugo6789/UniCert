import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  ScheduleDetailFailure,
  ScheduleDetailsStart,
  ScheduleDetailSuccess,
} from "../../redux/slice/Schedule/scheduleDetailSlice";

import agent from "../../utils/agent";

const useScheduleDetail = () => {
  const state = useAppSelector((state) => state.scheduleDetail);
  const dispatch = useAppDispatch();
  const getScheduleDetails = async (id: number) => {
    dispatch(ScheduleDetailsStart());
    try {
      const response = await agent.Schedule.getScheduleDetail(id);
      dispatch(ScheduleDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Schedule details:", error);
      dispatch(ScheduleDetailFailure());
    }
  };
  return { state, getScheduleDetails };
};
export default useScheduleDetail;
