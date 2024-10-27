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

  const handleCreatePayment = async (input: createPayment) => {
    dispatch(createPaymentStart());
    try {
      const response = await agent.Payment.createPayment(input);
      dispatch(createPaymentSuccess(response));
    } catch (error) {
      console.error("Error creating payment:", error);
      dispatch(createPaymentFailure());
    }
  };

  return { state, handleCreatePayment };
}
