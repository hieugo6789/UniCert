import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  PeerReviewDetailFailure,
  PeerReviewDetailsStart,
  PeerReviewDetailSuccess,
} from "../../redux/slice/PeerReview/peerReviewDetailSlice";

import agent from "../../utils/agent";

const usePeerReviewDetail = () => {
  const state = useAppSelector((state) => state.peerReviewDetail);
  const dispatch = useAppDispatch();
  const getPeerReviewDetails = async (id: number) => {
    dispatch(PeerReviewDetailsStart());
    try {
      const response = await agent.peerReview.getPeerDetailById(id, 1);
      dispatch(PeerReviewDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching PeerReview details:", error);
      dispatch(PeerReviewDetailFailure());
    }
  };
  return { state, getPeerReviewDetails };
};
export default usePeerReviewDetail;
