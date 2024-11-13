import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { changePasswordFailure, changePasswordSuccess } from "../../redux/slice/Password/ChangePasswordSlice";
import { forgotPasswordStart } from "../../redux/slice/Password/ForgotPasswordSlice";
import agent from "../../utils/agent";
export interface forgotPasswordInput{
  email: string
}
export function useCreateOrganize() {
  const state = useAppSelector((state) => state.changePassword);
  const dispatch = useAppDispatch();

  const forgotPassword = async (
    data: forgotPasswordInput
  ) => {
    dispatch(forgotPasswordStart());
    try {
      const response = await agent.resetPassword.forgotPassword(
        data
      );
      dispatch(changePasswordSuccess(response));
    } catch (error) {
      console.error("Error change password:", error);
      dispatch(changePasswordFailure());
    }
  };

  return { state, forgotPassword };
}
