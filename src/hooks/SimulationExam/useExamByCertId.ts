import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allExamPaginationData } from "../../models/simulationExam";
import { fetchExamByCertId } from "../../redux/slice/SimulationExam/examSlice";

const useExamByCertId = (certId: number) => {
  const dispatch = useAppDispatch();
  const [exam, setExam] = useState<allExamPaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExams = async (certId: number) => {
    setLoading(true);
    try {
      if (certId) {
        const response = await dispatch(fetchExamByCertId(certId));
        setExam(response.payload.data || []);
      } else {
        console.error("CertId is not provided.");
      }
    } catch (err) {
      console.log("Error fetching exams.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (certId) {
      fetchExams(certId);
    }
  }, [dispatch, certId]);

  return { exam, loading, refetchExams: fetchExams };
};
export default useExamByCertId;
