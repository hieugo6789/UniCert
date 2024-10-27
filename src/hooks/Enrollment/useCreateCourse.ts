import { createCourseEnrollment } from "../../models/enrollment";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createCourseEnrollmentFailure,
  createCourseEnrollmentStart,
  createCourseEnrollmentSuccess,
} from "../../redux/slice/Enrollment/createCourseEnrollSlice";
import agent from "../../utils/agent";

export function useCreateCourseEnrollment() {
  const state = useAppSelector((state) => state.createCourseEnrollment);
  const dispatch = useAppDispatch();

  const handleCreateCourseEnrollment = async (
    input: createCourseEnrollment
  ) => {
    dispatch(createCourseEnrollmentStart());
    try {
      const response = await agent.Enrollment.createCourseEnroll(input);
      dispatch(createCourseEnrollmentSuccess(response));
    } catch (error) {
      console.error("Error creating course enrollment:", error);
      dispatch(createCourseEnrollmentFailure());
    }
  };

  return { state, handleCreateCourseEnrollment };
}
