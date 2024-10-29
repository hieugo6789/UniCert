import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailCourseFailure,
  UpdateDetailCourseStart,
  UpdateDetailCourseSuccess,
} from "../../redux/slice/Course/courseDetailSlice";
import agent from "../../utils/agent";

const useCoursePermission = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.courseDetail);

  const updatePermissionCourseDetails = async (
    courseId: number,
    data: number
  ) => {
    dispatch(UpdateDetailCourseStart());
    try {
      const response = await agent.InternalCourse.updateCoursePermission(
        courseId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailCourseSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailCourseFailure(
          error.message || "Failed to update course detail"
        )
      );
    }
  };

  return {
    updatePermissionCourseDetails,
    state,
  };
};
export default useCoursePermission;
