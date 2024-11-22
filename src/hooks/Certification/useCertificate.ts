import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allCertificationData } from "../../models/certificate";
import { fetchAllCertificatePagination } from "../../redux/slice/Certification/certificateSlice";
const useCertificate = () => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCertificates = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllCertificatePagination(name));
      setCertificate(response.payload.data.data || []);
    } catch (err) {
      console.log("Error fetching certificates.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, [dispatch]);

  return {
    certificate,
    loading,
    refetchCertificates: fetchCertificates,
  };
};
export default useCertificate;
