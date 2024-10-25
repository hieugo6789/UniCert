import { useEffect, useState } from "react";
// import CertificateCard from "../../../components/Certifications/CertificateCard";
import MajorCard from "../../../components/Majors/MajorCard";
import { allMajorPaginationData } from "../../../models/major";
import useMajor from "../../../hooks/Major/useMajor";
import CertificateCard from "../../../components/Certifications/CertificateCard";
import { cardCertificate } from "../../../models/certificate";
import Loading from "../../../components/UI/Loading";

const Majors = () => {
  const [topCert] = useState<cardCertificate[]>([
    {
      certId: 1,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",           
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
    {
      certId: 2,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",            
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
  ]);
  const { major, refetchMajors, loading } = useMajor();
  const [majors, setMajors] = useState<allMajorPaginationData[]>([]);

  useEffect(() => {
    refetchMajors();
  }, []);
  useEffect(() => {
    setMajors(major);
  }, [major]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
    };
    scrollToTop();
  });

  return (
    <>
      <div>
        <div className="text-center py-10 bg-purple-400 text-white">
          <h1 className="text-4xl font-bold">
            Obtain certification through your major
          </h1>
        </div>

        <div className="py-10 text-center">
          <h2 className="text-2xl font-bold mb-6">Pick your major</h2>

          <div className="relative mb-6 w-1/2 m-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-3 top-2 text-black">🔍</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {/* {loading && <div>Loading...</div>} */}
            {majors.map((major, index) => (
              <MajorCard
                key={index}
                {...major}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button className="p-2">◀</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="p-2 bg-gray-200 rounded-full"
              >
                {page}
              </button>
            ))}
            <button className="p-2">▶</button>
          </div>
        </div>

        <div className="py-10 bg-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Best certifications for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {topCert.map((cert) => (
              <CertificateCard
                {...cert}
                key={cert.certId}
              />
            ))}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};
export default Majors;
