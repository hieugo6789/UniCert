import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  CourseDetailFailure,
  CourseDetailsStart,
  CourseDetailSuccess,
} from "../../redux/slice/Course/courseDetailSlice";
import agent from "../../utils/agent";

const useCourseDetail = () => {
  const state = useAppSelector((state) => state.courseDetail);
  const dispatch = useAppDispatch();
  const getCourseDetails = async (id: string) => {
    dispatch(CourseDetailsStart());
    try {
      const response = await agent.InternalCourse.getCourseDetail(id);
      dispatch(CourseDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Course details:", error);
      dispatch(CourseDetailFailure());
    }
  };
  return { state, getCourseDetails };
};
export default useCourseDetail;
