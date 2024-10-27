import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { courseEnrollment } from "../../models/enrollment";
import { fetchCourseEnrollmentByUserId } from "../../redux/slice/Enrollment/CourseSlice";

interface UseCourseEnrollmentProps {
  userId: string;
}

const useCourseEnrollment = ({ userId }: UseCourseEnrollmentProps) => {
  const dispatch = useAppDispatch();
  const [courseEnrollment, setCourseEnrollment] = useState<courseEnrollment[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourseEnrollments = async (userId: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchCourseEnrollmentByUserId(userId)); // Pass the search term to the API call
      setCourseEnrollment(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching majors.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourseEnrollments(userId);
  }, [dispatch]);
  return {
    courseEnrollment,
    loading,
  };
};
export default useCourseEnrollment;
