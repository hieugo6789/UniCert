import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { Students } from "../../models/course";
import { fetchStudentList } from "../../redux/slice/Course/studentListSlice";
interface UseStudentListProps {
  courseId: number;
}
const useStudentList = ({ courseId }: UseStudentListProps) => {
  const dispatch = useAppDispatch();
  const [students, setStudents] = useState<Students[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStudents = async (courseId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchStudentList(courseId));
      setStudents(response.payload.data || []);
    } catch (err) {
      console.error("Error fetching students.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents(courseId);
  }, [dispatch]);

  return { students, loading };
};
export default useStudentList;
