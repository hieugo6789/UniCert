import { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const majorsPerPage = 4;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    refetchMajors();
  }, []);

  useEffect(() => {
    const approvedMajors = major.filter((m) => m.majorPermission === "Approve");
    setMajors(approvedMajors);
  }, [major]);

  useEffect(() => {
    const filteredMajors = major.filter(m => 
      m.majorName.toLowerCase().includes(keyword.toLowerCase()) && 
      m.majorPermission === "Approve"
    );
    setMajors(filteredMajors);
  }, [keyword, major]);

  const maxPage = Math.ceil(majors.length / majorsPerPage);

  const handleNextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const displayedMajors = majors.slice(currentPage * majorsPerPage, (currentPage + 1) * majorsPerPage);

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div>
        <div className="text-center py-10 bg-purple-400 text-white">
          <h1 className="text-4xl font-bold">Obtain certification through your major</h1>
        </div>

        <div className="py-10 text-center">
          <h2 className="text-2xl font-bold mb-6">Pick your major</h2>

          <div className="relative mb-6 w-1/2 m-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={keyword}
              onChange={changeKeyword}              
            />
            <span className="absolute right-3 top-2 text-black">🔍</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              className="p-2"
              disabled={currentPage === 0}
              style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
            >
              ◀
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedMajors.map((major) => (
                <MajorCard key={major.majorId} {...major} />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              className="p-2"
              disabled={currentPage === maxPage - 1}
              style={{ opacity: currentPage === maxPage - 1 ? 0.5 : 1 }}
            >
              ▶
            </button>
          </div>

          <div className="mt-8">
            <span className="text-lg font-semibold text-gray-700">
              Page {currentPage + 1} of {maxPage}
            </span>
          </div>
        </div>

        <div className="py-10 bg-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-6">Best certifications for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {topCert.map((cert) => (
              <CertificateCard {...cert} key={cert.certId} />
            ))}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Majors;
