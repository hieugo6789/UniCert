import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { fetchMonthlyRevenue } from "../../redux/slice/Dashboard/DashboardSlice";

interface UseMonthlyRevenueProps {
  year: number;
}
const useMonthlyRevenue = ({ year }: UseMonthlyRevenueProps) => {
  const dispatch = useAppDispatch();
  const [revenue, setRevenue] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRevenues = async (year: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchMonthlyRevenue(year));
      setRevenue(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRevenues(year);
  }, [dispatch]);

  return { revenue, loading, refetchRevenues: fetchRevenues };
};
export default useMonthlyRevenue;
