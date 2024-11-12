import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteExamFailure,
  deleteExamStart,
  deleteExamSuccess,
} from "../../redux/slice/Enrollment/deleteExamEnrollSlice";

import agent from "../../utils/agent";

const useDeleteExamEnroll = () => {
  const state = useAppSelector((state) => state.deleteExamEnrollment);
  const dispatch = useAppDispatch();

  const handleDeleteExamEnroll = async (eEnrollmentId: number) => {
    dispatch(deleteExamStart());
    try {
      const response = await agent.Enrollment.deleteExamEnrollment(
        eEnrollmentId
      );
      dispatch(deleteExamSuccess(response.data));
    } catch (error) {
      console.error("Error deleting exam enrollment:", error);
      dispatch(deleteExamFailure());
    }
  };
  return { state, handleDeleteExamEnroll };
};
export default useDeleteExamEnroll;
