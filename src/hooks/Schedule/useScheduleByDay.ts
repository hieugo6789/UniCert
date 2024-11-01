import { useAppDispatch } from "../../redux/hook";
import { currentSchedule } from "../../models/schedule";
import { fetchAllSchedulePaginationbyID } from "../../redux/slice/Schedule/scheduleSlice";
import { useState } from "react";

const useScheduleByDay = () => {
  const dispatch = useAppDispatch();
  const [schedule, setSchedule] = useState<currentSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSchedulesbyID = async (dateInput: string) => {
    setLoading(true);
    try {
      const response = await dispatch(
        fetchAllSchedulePaginationbyID(dateInput)
      );
      const data = response.payload.data || [];
      const parsedData = data.map((item: currentSchedule) => ({
        ...item,
        sessionDate: new Date(item.sessionDate),
        sessionCreatedAt: new Date(item.sessionCreatedAt),
      }));
      setSchedule(parsedData);
    } catch (err) {
      console.error("Error fetching schedule.", err);
    } finally {
      setLoading(false);
    }
  };

  return { schedule, loading, refetchSchedule: fetchSchedulesbyID };
};

export default useScheduleByDay;
