import { scheduleInput } from "../../models/schedule";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createScheduleFailure,
  createScheduleStart,
  createScheduleSuccess,
} from "../../redux/slice/Schedule/createSchedule";
import agent from "../../utils/agent";

export function useCreateSchedule() {
  const state = useAppSelector((state) => state.createSchedule);
  const dispatch = useAppDispatch();

  const handleCreateSchedule = async (scheduleData: scheduleInput) => {
    dispatch(createScheduleStart());
    try {
      const response = await agent.Schedule.createSchedule(scheduleData);
      dispatch(createScheduleSuccess(response));
    } catch (error) {
      console.error("Error creating organization:", error);
      dispatch(createScheduleFailure());
    }
  };

  return { state, handleCreateSchedule };
}
