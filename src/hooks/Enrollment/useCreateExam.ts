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

  const handleCreateExamEnrollment = async (input: createExamEnrollment, voucherIds?: number[]) => {
    dispatch(createExamEnrollmentStart());
    try {
      const response = await agent.Enrollment.createExamEnroll(input);
      dispatch(createExamEnrollmentSuccess(response));
      if (voucherIds) {
        console.log("Exam enrollment created successfully:", response);
        const eErollmentId = response.data.examEnrollmentId;
        console.log("Exam enrollment id:", eErollmentId);
        const data = await agent.Enrollment.addVoucherToCart(eErollmentId, { userId: input.userId, simulation_Exams: input.simulation_Exams, voucherIds: voucherIds ? voucherIds : [] });
        console.log("Voucher added to cart successfully:", data);
      }
    } catch (error) {
      console.error("Error creating exam enrollment:", error);
      dispatch(createExamEnrollmentFailure());
    }
  };

  return { state, handleCreateExamEnrollment };
}
