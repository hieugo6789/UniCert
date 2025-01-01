import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { fetchPeerReviewByExamId } from "../../redux/slice/PeerReview/peerReviewByExamIdSlice";
import { peerReviewByExamId } from "../../models/peerReview";

interface UsePeerReviewByExamIdProps {
  examId: number;
}

const usePeerReviewByExamId = ({ examId }: UsePeerReviewByExamIdProps) => {
  const dispatch = useAppDispatch();
  const [peerReview, setPeerReview] = useState<peerReviewByExamId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPeerReviews = async (examId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchPeerReviewByExamId(examId));      
      setPeerReview(response.payload || []);      
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchPeerReviews(examId);
    }
  }, [dispatch, examId]);

  return {
    peerReview,
    loading,
    refetchPeerReviews: () => fetchPeerReviews(examId),
  };
};

export default usePeerReviewByExamId;
