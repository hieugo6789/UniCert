import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
} from "../../redux/slice/Enrollment/deleteCourseEnrollSlice";

import agent from "../../utils/agent";

const useDeleteCourseEnroll = () => {
  const state = useAppSelector((state) => state.deleteCourseEnrollment);
  const dispatch = useAppDispatch();

  const handleDeleteCourseEnroll = async (cEnrollmentId: number) => {
    dispatch(deleteCourseStart());
    try {
      const response = await agent.Enrollment.deleteCourseEnrollment(
        cEnrollmentId
      );
      dispatch(deleteCourseSuccess(response.data));
    } catch (error) {
      console.error("Error deleting course enrollment:", error);
      dispatch(deleteCourseFailure());
    }
  };
  return { state, handleDeleteCourseEnroll };
};
export default useDeleteCourseEnroll;
