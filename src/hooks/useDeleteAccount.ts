import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  deleteAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
} from "../redux/slice/deleteAccountSlice";
import agent from "../utils/agent";

const useDeleteAccount = () => {
  const state = useAppSelector((state) => state.accountDelete);
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async (userId: string) => {
    dispatch(deleteAccountStart());
    try {
      const response = await agent.Account.deleteAccount(userId);
      dispatch(deleteAccountSuccess(response.data));
    } catch (error) {
      console.error("Error deleting account:", error);
      dispatch(deleteAccountFailure());
    }
  };
  return { state, handleDeleteAccount };
};
export default useDeleteAccount;
