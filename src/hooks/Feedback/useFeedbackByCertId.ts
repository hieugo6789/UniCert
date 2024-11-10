import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { feedbackPagination } from "../../models/feedback";
import { fetchFeedbackByCertId } from "../../redux/slice/Feedback/feedbackSlice";
interface UseFeedbackByCertIdProps {
  certId: number;
}
const useFeedbackByCertId = ({ certId }: UseFeedbackByCertIdProps) => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<feedbackPagination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbacks = async (certId: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchFeedbackByCertId(certId));
      setFeedback(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedbacks(certId);
  }, [dispatch]);

  return { feedback, loading, refetchFeedbacks: fetchFeedbacks };
};
export default useFeedbackByCertId;