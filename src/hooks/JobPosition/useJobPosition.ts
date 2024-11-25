import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allJobPaginationData } from "../../models/jobPosition";
import { fetchAllJobPagination } from "../../redux/slice/JobPosition/jobSlice";

const useJob = () => {
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<allJobPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllJobPagination(name));
      setJob(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching jobs.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return { job, loading, refetchJobs: fetchJobs };
};
export default useJob;
