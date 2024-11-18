import { payNow } from "../../models/payment";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  payNowFailure,
  payNowStart,
  payNowSuccess,
} from "../../redux/slice/Payment/payNowSlice";
import agent from "../../utils/agent";

export function usePayNow() {
  const state = useAppSelector((state) => state.payNow);
  const dispatch = useAppDispatch();

  const handlePayNow = async (input: payNow) => {
    dispatch(payNowStart());
    try {
      const response = await agent.Payment.payNow(input);
      dispatch(payNowSuccess(response));
    } catch (error) {
      console.error("Error creating payment:", error);
      dispatch(payNowFailure());
    }
  };

  return { state, handlePayNow };
}
