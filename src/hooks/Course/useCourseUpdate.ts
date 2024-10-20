import { updateCourse } from "../../models/course";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailCourseFailure,
  UpdateDetailCourseStart,
  UpdateDetailCourseSuccess,
} from "../../redux/slice/courseDetailSlice";
import agent from "../../utils/agent";

const useUpdateCourse = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.courseDetail);

  const updateCourseDetails = async (courseId: string, data: updateCourse) => {
    dispatch(UpdateDetailCourseStart());
    try {
      const response = await agent.InternalCourse.updateCourse(courseId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailCourseSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailCourseFailure(
          error.message || "Failed to update major detail"
        )
      );
    }
  };

  return {
    updateCourseDetails,
    state,
  };
};
export default useUpdateCourse;
