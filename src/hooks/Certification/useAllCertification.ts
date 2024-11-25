import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allCertificationData } from "../../models/certificate";
import { fetchAllCertification } from "../../redux/slice/Certification/certificateSlice";

const useAllCertification = () => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllCertifications = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllCertification());
      setCertificate(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCertifications();
  }, []);
  return { certificate, loading };
};
export default useAllCertification;
