import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allExamPaginationData } from "../../models/SimulationExam/simulationExam";
import { fetchAllExamPagination } from "../../redux/slice/SimulationExam/examSlice";

const useExam = () => {
  const dispatch = useAppDispatch();
  const [exam, setExam] = useState<allExamPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExams = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllExamPagination(name));
      setExam(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching exams.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExams();
  }, [dispatch]);

  return { exam, loading, refetchExams: fetchExams };
};
export default useExam;
