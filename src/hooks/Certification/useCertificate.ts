import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { allCertificationData, metaData } from "../../models/certificate";
import { fetchAllCertificatePagination } from "../../redux/slice/Certification/certificateSlice";

const useCertificate = () => {
  const dispatch = useAppDispatch();
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [metaData, setMetaData] = useState<metaData>({
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCertificates = async (
    name?: string,
    pageNumber?: number,
    pageSize?: number,
    permission?: number
  ) => {
    setLoading(true);
    try {
      const response = await dispatch(
        fetchAllCertificatePagination({
          name,
          pageNumber,
          pageSize,
          permission,
        })
      );
      setCertificate(response.payload.data.data || []);
      console.log(response.payload);
      setMetaData(response.payload.metadata);
    } catch (err) {
      console.log("Error fetching certificates.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCertificates();
  }, []);

  return {
    certificate,
    loading,
    metaData,
    refetchCertificates: fetchCertificates,
  };
};
export default useCertificate;
