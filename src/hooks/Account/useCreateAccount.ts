import { CreateEmployeeAccount } from "../../models/authentication";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createAccountFailure,
  createAccountStart,
  createAccountSuccess,
} from "../../redux/slice/Account/createAccountSlice";
import agent from "../../utils/agent";

export function useCreateAccount() {
  const state = useAppSelector((state) => state.createAccount);
  const dispatch = useAppDispatch();

  const handleCreateAccount = async (input: CreateEmployeeAccount) => {
    dispatch(createAccountStart());
    try {
      const response = await agent.Employees.createEmployeeAccount(input);
      dispatch(createAccountSuccess(response));
    } catch (error) {
      console.error("Error creating Account:", error);
      dispatch(createAccountFailure());
    }
  };

  return { state, handleCreateAccount };
}
