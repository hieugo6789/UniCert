import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { courseEnrollmentPayment } from "../../models/payment";
import { fetchAllCoursePayment } from "../../redux/slice/Payment/coursePaymentSlice";


interface UseCoursePaymentProps {
  userId: string;
}

const useCoursePayment = ({ userId }: UseCoursePaymentProps) => {
  const dispatch = useAppDispatch();
  const [coursePayment, setCoursePayment] = useState<courseEnrollmentPayment[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoursePayment = async (userId: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllCoursePayment(userId));
      setCoursePayment(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching jobs.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoursePayment(userId);
  }, [dispatch]);

  return { coursePayment, loading, refetchCoursePayment: fetchCoursePayment };
};
export default useCoursePayment;
