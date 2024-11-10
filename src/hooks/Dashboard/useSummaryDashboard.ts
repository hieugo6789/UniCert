import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { summaryDashboard } from "../../models/dashboard";
import { fetchSummaryDashboard } from "../../redux/slice/Dashboard/DashboardSlice";

const useSummaryDashboard = () => {
  const dispatch = useAppDispatch();
  const [summary, setSummary] = useState<summaryDashboard>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchSummaryDashboard());
      setSummary(response.payload.data || []);
    } catch (err) {
      console.error("Error fetching summary.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSummary();
  }, [dispatch]);

  return { summary, loading };
};
export default useSummaryDashboard;
