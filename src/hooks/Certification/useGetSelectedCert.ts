import { useState } from "react";
import { allCertificationData } from "../../models/certificate";
import agent from "../../utils/agent";

const useGetSelectedCert = () => {
  const [certificate, setCertificate] = useState<allCertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSelectedCert = async (userId: string) => {
    setLoading(true);
    try {
      // Bước 1: Lấy danh sách chứng chỉ từ userId
      const response = await agent.selectedCert.getByUser(userId);
      const data = response; // Ví dụ: {certId: 115, certName: 'Google Data Analytics Certification'}
      // console.log(data);
      // Bước 2: Gọi API để lấy chi tiết chứng chỉ dựa trên certId
      const certs = await Promise.all(
        data.map(async (cert: { certId: number }) => {
          const certDetail = await agent.Certificate.getCertificateDetail(cert.certId);
          return certDetail.data; // Ví dụ: {certId: 115, certName: 'Google Data Analytics Certification'}
        })
      );

      // Bước 3: Lưu vào state certificate
      setCertificate(certs);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  return { certificate, loading, fetchSelectedCert };
};

export default useGetSelectedCert;
