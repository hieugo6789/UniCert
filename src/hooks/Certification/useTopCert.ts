import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allCertificationData } from "../../models/certificate";
import { fetchTopCertificate } from "../../redux/slice/Certification/certificateSlice";

interface UseTopCertProps {
  topN: number;
}

const useTopCert = ({ topN }: UseTopCertProps) => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCertificates = async (topN: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchTopCertificate(topN));
      setCertificate(response.payload.data || []);
    } catch (err) {
      console.log("Error fetching certificates.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCertificates(topN);
  }, [dispatch]);

  return {
    certificate,
    loading,
  };
};
export default useTopCert;
