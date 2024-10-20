import { inputTransaction } from "../models/transaction";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
} from "../redux/slice/Wallet/createTransactionSlice";
import agent from "../utils/agent";
export interface CreateTransactionResponse {
  data: {
    transactionId: number;
    point: number;
    userId: number;
  };
}
export const useCreateTransaction = () => {
  const state = useAppSelector((state) => state.createTransaction);
  const dispatch = useAppDispatch();

  const handleCreateTransaction = async (
    transactionData: inputTransaction
  ): Promise<CreateTransactionResponse> => {
    dispatch(createTransactionStart());

    try {
      const response = await agent.TransactionWallet.createTransaction(
        transactionData
      );
      dispatch(createTransactionSuccess(response.data));
      return response; // Return the response with the transaction ID
    } catch (error) {
      console.error("Error creating transaction:", error);
      dispatch(createTransactionFailure());
      throw error; // Rethrow the error for handling in the component
    }
  };

  return { state, handleCreateTransaction };
};
