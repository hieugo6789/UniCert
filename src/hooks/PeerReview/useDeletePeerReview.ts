import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deletePeerReviewFailure,
  deletePeerReviewStart,
  deletePeerReviewSuccess,
} from "../../redux/slice/PeerReview/deletePeerReviewSlice";

import agent from "../../utils/agent";

const useDeletePeerReview = () => {
  const state = useAppSelector((state) => state.deletePeerReview);
  const dispatch = useAppDispatch();

  const handleDeletePeerReview = async (peerReviewId: number) => {
    dispatch(deletePeerReviewStart());
    try {
      const response = await agent.peerReview.deletePeerReview(peerReviewId);
      dispatch(deletePeerReviewSuccess(response.data));
    } catch (error) {
      console.error("Error deleting peer review:", error);
      dispatch(deletePeerReviewFailure());
    }
  };
  return { state, handleDeletePeerReview };
};
export default useDeletePeerReview;
