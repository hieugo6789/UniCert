import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allCertificationData } from "../../models/certificate";
import { fetchCertificatesByUser } from "../../redux/slice/Certification/getSelectedCertSlice";

const useGetSelectedCert = () => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSelectedCert = async (userId: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchCertificatesByUser(userId));
      setCertificate(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  return { certificate, loading, fetchSelectedCert };
}
export default useGetSelectedCert;
