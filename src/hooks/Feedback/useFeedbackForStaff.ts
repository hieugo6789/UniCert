import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { feedbackPagination } from "../../models/feedback";
import { fetchFeedbackForStaff } from "../../redux/slice/Feedback/feedbackSlice";

const useFeedbackForStaff = () => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<feedbackPagination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchFeedbackForStaff());
      setFeedback(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return { feedback, loading, refetchFeedbacks: fetchFeedbacks };
};
export default useFeedbackForStaff;
