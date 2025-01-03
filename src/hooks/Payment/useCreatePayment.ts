import { createPayment } from "../../models/payment";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createPaymentFailure,
  createPaymentStart,
  createPaymentSuccess,
} from "../../redux/slice/Payment/createPaymentSlice";
import agent from "../../utils/agent";

export function useCreatePayment() {
  const state = useAppSelector((state) => state.createPayment);
  const dispatch = useAppDispatch();

  const handleCreatePayment = async (input: createPayment, simulation_Exam?: number[], voucherIds?: number[]) => {
    dispatch(createPaymentStart());
    try {
      if (voucherIds) {
        const data = await agent.Enrollment.addVoucherToCart(input.examEnrollmentId, { userId: input.userId, simulation_Exams: simulation_Exam ? simulation_Exam : [], voucherIds: voucherIds ? voucherIds : [] });
        console.log(data);
      }
      const response = await agent.Payment.createPayment(input);
      console.log(response);
      dispatch(createPaymentSuccess(response));
      
    } catch (error) {
      console.error("Error creating payment:", error);
      dispatch(createPaymentFailure());
      throw error
    }
  };

  return { state, handleCreatePayment };
}
