import { createScore } from "../../models/score";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createScoreFailure, createScoreStart, createScoreSuccess } from "../../redux/slice/Scope/createScore";
import agent from "../../utils/agent";

export function useCreateScore() {
  const state = useAppSelector((state) => state.createExam);
  const dispatch = useAppDispatch();

  const handleCreateScore = async (data: createScore) => {
    dispatch(createScoreStart());
    try {
      const response = await agent.Scope.submitScore(data);
      dispatch(createScoreSuccess(response));
    } catch (error) {
      console.error("Error creating simulation exam:", error);
      dispatch(createScoreFailure());
    }
  };

  return { state, handleCreateScore };
}
