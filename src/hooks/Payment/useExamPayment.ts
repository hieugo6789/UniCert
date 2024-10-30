import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { examEnrollmentPayment } from "../../models/payment";
import { fetchAllExamPayment } from "../../redux/slice/Payment/examPaymentSlice";

interface UseExamPaymentProps {
  userId: string;
}

const useExamPayment = ({ userId }: UseExamPaymentProps) => {
  const dispatch = useAppDispatch();
  const [examPayment, setExamPayment] = useState<examEnrollmentPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExamPayment = async (userId: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllExamPayment(userId));
      setExamPayment(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching jobs.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExamPayment(userId);
  }, [dispatch]);

  return { examPayment, loading,refetchExamPayment: fetchExamPayment };
};
export default useExamPayment;
