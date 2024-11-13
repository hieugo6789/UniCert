import { ChangePasswordInput } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { changePasswordFailure, changePasswordStart, changePasswordSuccess } from "../../redux/slice/Password/ChangePasswordSlice";
import agent from "../../utils/agent";

export function useChangePassword() {
  const state = useAppSelector((state) => state.changePassword);
  const dispatch = useAppDispatch();

  const changePassword = async (
    data: ChangePasswordInput,
    userId: string
  ) => {
    dispatch(changePasswordStart());
    try {
      const response = await agent.ChangePassword.changePassword(
        data,
        userId
      );
      dispatch(changePasswordSuccess(response));
    } catch (error) {
      console.error("Error change password:", error);
      dispatch(changePasswordFailure());
    }
  };

  return { state, changePassword };
}
