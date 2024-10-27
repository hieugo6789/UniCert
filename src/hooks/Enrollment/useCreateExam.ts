import { createExamEnrollment } from "../../models/enrollment";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createExamEnrollmentFailure,
  createExamEnrollmentStart,
  createExamEnrollmentSuccess,
} from "../../redux/slice/Enrollment/createExamEnrollSlice";
import agent from "../../utils/agent";

export function useCreateExamEnrollment() {
  const state = useAppSelector((state) => state.createExamEnrollment);
  const dispatch = useAppDispatch();

  const handleCreateExamEnrollment = async (input: createExamEnrollment) => {
    dispatch(createExamEnrollmentStart());
    try {
      const response = await agent.Enrollment.createExamEnroll(input);
      dispatch(createExamEnrollmentSuccess(response));
    } catch (error) {
      console.error("Error creating exam enrollment:", error);
      dispatch(createExamEnrollmentFailure());
    }
  };

  return { state, handleCreateExamEnrollment };
}
