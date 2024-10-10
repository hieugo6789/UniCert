import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { allCertificationData } from "../models/certificate";
import { fetchAllCertificatePagination } from "../redux/slice/certificateSlice";
const useCertificate = () => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllCertificatePagination(name));
      setCertificate(response.payload.data || []);
    } catch (err) {
      setError("Error fetching accounts.");
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
    error,
    refetchCertificates: fetchCertificates,
  };
};
export default useCertificate;
