import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { examEnrollment } from "../../models/enrollment";
import { fetchExamEnrollmentByUserId } from "../../redux/slice/Enrollment/ExamSlice";

interface UseExamEnrollmentProps {
  userId: string;
}

const useExamEnrollment = ({ userId }: UseExamEnrollmentProps) => {
  const dispatch = useAppDispatch();
  const [examEnrollment, setExamEnrollment] = useState<examEnrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExamEnrollments = async (userId: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchExamEnrollmentByUserId(userId)); // Pass the search term to the API call
      setExamEnrollment(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching majors.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExamEnrollments(userId);
  }, [dispatch]);
  return {
    examEnrollment,
    loading,
  };
};
export default useExamEnrollment;
