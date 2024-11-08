import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ScoreDetailFailure, ScoreDetailsStart, ScoreDetailSuccess } from "../../redux/slice/Score/scoreByUserAndExam";


import agent from "../../utils/agent";

const useScoreDetail = () => {
  const state = useAppSelector((state) => state.score.currentScore);
  const dispatch = useAppDispatch();
  const getScoreDetails = async (userId: number, examId: number) => {
    dispatch(ScoreDetailsStart());
    try {
      const response = await agent.Score.getCoreByUserAndExam(userId, examId);
      dispatch(ScoreDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Schedule details:", error);
      dispatch(ScoreDetailFailure());
    }
  };
  return { state, getScoreDetails };
};
export default useScoreDetail;