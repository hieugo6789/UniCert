import { MajorInput } from "../models/major";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createMajorFailure,
  createMajorStart,
  createMajorSuccess,
} from "../redux/slice/createMajorSlice";
import agent from "../utils/agent";

export function useCreateMajor() {
  const state = useAppSelector((state) => state.createMajor);
  const dispatch = useAppDispatch();

  const handleCreateMajor = async (majorData: MajorInput) => {
    dispatch(createMajorStart());
    try {
      const response = await agent.Major.createMajor(majorData);
      dispatch(createMajorSuccess(response));
    } catch (error) {
      console.error("Error creating major:", error);
      dispatch(createMajorFailure());
    }
  };

  return { state, handleCreateMajor };
}
