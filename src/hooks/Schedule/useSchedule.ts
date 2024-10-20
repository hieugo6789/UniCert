import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allSchedulePaginationData } from "../../models/schedule";
import { fetchAllSchedulePagination } from "../../redux/slice/Schedule/scheduleSlice";

const useSchedule = () => {
  const dispatch = useAppDispatch();
  const [schedule, setSchedule] = useState<allSchedulePaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSchedules = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllSchedulePagination(name));
      setSchedule(response.payload.data || []);
    } catch (err) {
      console.error("Error fetching accounts.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSchedules();
  }, [dispatch]);

  return { schedule, loading, refetchSchedule: fetchSchedules };
};
export default useSchedule;
