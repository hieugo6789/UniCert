import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { feedbackPagination } from "../../models/feedback";
import { fetchAllFeedback } from "../../redux/slice/Feedback/feedbackSlice";
interface UseFeedbackProps {
  examId: number;
}
const useFeedback = ({ examId }: UseFeedbackProps) => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<feedbackPagination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbacks = async (examId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllFeedback(examId));
      setFeedback(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedbacks(examId);
  }, []);

  return { feedback, loading, refetchFeedbacks: fetchFeedbacks };
};
export default useFeedback;
