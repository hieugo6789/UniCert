import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { allJobPaginationData } from "../models/jobPosition";
import { fetchAllJobPagination } from "../redux/slice/jobSlice";

const useJob = () => {
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<allJobPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllJobPagination(name));
      setJob(response.payload.data || []);
    } catch (err) {
      setError("Error fetching accounts.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [dispatch]);

  return { job, loading, error, refetchJobs: fetchJobs };
};
export default useJob;
