import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { fetchPeerReviewByScoreId } from "../../redux/slice/PeerReview/peerReviewByScoreIdSlice";
import { peerReviewByScoreId } from "../../models/peerReview";

interface UsePeerReviewByScoreIdProps {
  scoreId: number;
}

const usePeerReviewByScoreId = ({ scoreId }: UsePeerReviewByScoreIdProps) => {
  const dispatch = useAppDispatch();
  const [peerReview, setPeerReview] = useState<peerReviewByScoreId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPeerReviews = async (scoreId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchPeerReviewByScoreId(scoreId));
      setPeerReview(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scoreId) {
      fetchPeerReviews(scoreId);
    }
  }, [dispatch, scoreId]);

  return {
    peerReview,
    loading,
    refetchPeerReviews: () => fetchPeerReviews(scoreId),
  };
};

export default usePeerReviewByScoreId;
