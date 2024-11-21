import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  CourseEnrollmentDetailFailure,
  CourseEnrollmentDetailsStart,
  CourseEnrollmentDetailSuccess,
} from "../../redux/slice/Enrollment/courseEnrollmentDetailSlice";
import agent from "../../utils/agent";

const useCourseEnrollmentDetail = () => {
  const state = useAppSelector((state) => state.courseEnrollmentDetail);
  const dispatch = useAppDispatch();
  const getCourseEnrollmentDetails = async (id: number) => {
    dispatch(CourseEnrollmentDetailsStart());
    try {
      const response = await agent.Enrollment.getCourseEnrollDetail(id);
      dispatch(CourseEnrollmentDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching CourseEnrollment details:", error);
      dispatch(CourseEnrollmentDetailFailure());
    }
  };
  return { state, getCourseEnrollmentDetails };
};
export default useCourseEnrollmentDetail;
