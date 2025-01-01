import { createPeerReview } from "../../models/peerReview";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createPeerReviewFailure,
  createPeerReviewStart,
  createPeerReviewSuccess,
} from "../../redux/slice/PeerReview/createPeerReviewSlice";

import agent from "../../utils/agent";

export function useCreatePeerReview() {
  const state = useAppSelector((state) => state.createPeerReview);
  const dispatch = useAppDispatch();

  const handleCreatePeerReview = async (input: createPeerReview) => {
    dispatch(createPeerReviewStart());
    try {
      const response = await agent.peerReview.postPeerReview(input);
      dispatch(createPeerReviewSuccess(response));
    } catch (error) {
      console.error("Error creating peer review:", error);
      dispatch(createPeerReviewFailure());
    }
  };

  return { state, handleCreatePeerReview };
}
