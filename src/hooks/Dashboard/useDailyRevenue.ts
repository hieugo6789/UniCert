import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { fetchDailyRevenue } from "../../redux/slice/Dashboard/DashboardSlice";

interface UseDailyRevenueProps {
  year: number;
  month: number;
}
const useDailyRevenue = ({ year, month }: UseDailyRevenueProps) => {
  const dispatch = useAppDispatch();
  const [revenue, setRevenue] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRevenues = async (year: number, month: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchDailyRevenue({ year, month }));
      setRevenue(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRevenues(year, month);
  }, [dispatch]);

  return { revenue, loading, refetchRevenues: fetchRevenues };
};
export default useDailyRevenue;
