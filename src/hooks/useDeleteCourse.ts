import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  deleteCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
} from "../redux/slice/deleteCourseSlice";
import agent from "../utils/agent";

const useDeleteCourse = () => {
  const state = useAppSelector((state) => state.deleteCourse);
  const dispatch = useAppDispatch();

  const handleDeleteCourse = async (courseId: string) => {
    dispatch(deleteCourseStart());
    try {
      const response = await agent.InternalCourse.deleteCourse(courseId);
      dispatch(deleteCourseSuccess(response.data));
    } catch (error) {
      console.error("Error deleting certification:", error);
      dispatch(deleteCourseFailure());
    }
  };
  return { state, handleDeleteCourse };
};
export default useDeleteCourse;
