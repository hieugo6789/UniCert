import { createScore } from "../../models/score";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { clearScore, createScoreFailure, createScoreStart, createScoreSuccess } from "../../redux/slice/Score/createScore";
import agent from "../../utils/agent";

export function useCreateScore() {
  const state = useAppSelector((state) => state.createScore);
  const dispatch = useAppDispatch();

  const handleCreateScore = async (data: createScore) => {
    dispatch(createScoreStart());
    try {
      const response = await agent.Score.submitScore(data);
      dispatch(createScoreSuccess(response));
    } catch (error) {
      console.error("Error creating simulation exam:", error);
      dispatch(createScoreFailure());
    }
  };
  const clearCreateScore = () => {
    dispatch(clearScore());
  }
  return { state, handleCreateScore, clearCreateScore };
}
