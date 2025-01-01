import { updatePeerReview } from "../../models/peerReview";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailPeerReviewFailure,
  UpdateDetailPeerReviewStart,
  UpdateDetailPeerReviewSuccess,
} from "../../redux/slice/PeerReview/peerReviewDetailSlice";

import agent from "../../utils/agent";

const useUpdatePeerReview = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.courseDetail);

  const updatePeerReviewDetails = async (
    peerReviewId: number,
    data: updatePeerReview
  ) => {
    dispatch(UpdateDetailPeerReviewStart());
    try {
      const response = await agent.peerReview.updatePeerDetail(
        peerReviewId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailPeerReviewSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailPeerReviewFailure(
          error.message || "Failed to update major detail"
        )
      );
    }
  };

  return {
    updatePeerReviewDetails,
    state,
  };
};
export default useUpdatePeerReview;
