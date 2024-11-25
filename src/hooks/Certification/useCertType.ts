import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allTypePaginationData } from "../../models/certType";
import { fetchAllTypePagination } from "../../redux/slice/Certification/certTypeSlice";

const useCertType = () => {
  const dispatch = useAppDispatch();
  const [certType, setCertType] = useState<allTypePaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCertTypes = async () => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllTypePagination());
      setCertType(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching certTypes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertTypes();
  }, []);
  return { certType, loading, refetchCertTypes: fetchCertTypes };
};
export default useCertType;
