import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { allCoursePaginationData } from "../models/course";
import { fetchAllCoursePagination } from "../redux/slice/courseSlice";

const useCourse = () => {
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<allCoursePaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllCoursePagination(name));
      setCourse(response.payload.data || []);
    } catch (err) {
      setError("Error fetching accounts.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [dispatch]);

  return { course, loading, error, refetchCourses: fetchCourses };
};
export default useCourse;
