import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allMajorPaginationData } from "../../models/major";
import { fetchFilterMajor } from "../../redux/slice/Major/majorSlice";

interface useFilterMajorProps {
  jobId: string;
  majorId: string;
}
const useFilterMajor = ({ jobId, majorId }: useFilterMajorProps) => {
  const dispatch = useAppDispatch();
  const [major, setMajor] = useState<allMajorPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMajors = async ({
    majorId,
    jobId,
  }: {
    majorId: string;
    jobId: string;
  }) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchFilterMajor({ majorId, jobId }));
      setMajor(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching majors.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (jobId && majorId) {
      fetchMajors({ jobId, majorId });
    }
  }, [jobId, majorId, dispatch]);

  return { major, loading };
};
export default useFilterMajor;
