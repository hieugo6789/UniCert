import { resetPasswordInput } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetPasswordFailure, resetPasswordStart, resetPasswordSuccess } from "../../redux/slice/Password/ResetPasswordSlice";
import agent from "../../utils/agent";

export function useResetPassword() {
  const state = useAppSelector((state) => state.changePassword);
  const dispatch = useAppDispatch();

  const resetPassword = async (
    data: resetPasswordInput
  ) => {
    dispatch(resetPasswordStart());
    try {
      const response = await agent.resetPassword.resetPassword(
        data
      );
      dispatch(resetPasswordSuccess(response));
    } catch (error) {
      console.error("Error change password:", error);
      dispatch(resetPasswordFailure());
    }
  };

  return { state, resetPassword };
}
