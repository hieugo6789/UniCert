import CertificateCard from "../../../components/Certifications/CertificateCard";
import defaultCertThumb from "../../../assets/images/Certification/defaultCertThumb.png";
import { useEffect, useState } from "react";
import { allCertificationData } from "../../../models/certificate";
import useCertificate from "../../../hooks/useCertificate";
import { Link } from "react-router-dom";

import Loading from "../../../components/UI/Loading";
const CertificatePage = () => {
  const [topCert] = useState<allCertificationData[]>([
    {
      certId: "1",
      certName: "AWS Certified Solutions Architect",
      certCode: "AWS-CSA",
      certDescription:
        "The AWS Certified Solutions Architect – Associate examination is intended for individuals who perform a solutions architect role and have one or more years of hands-on experience designing available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
    },
    {
      certId: "2",
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const { certificate, loading, refetchCertificates } = useCertificate();
  const [certificates, setCertificates] = useState<allCertificationData[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      refetchCertificates(); // Lấy tất cả chứng chỉ ban đầu
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (certificate.length > 0) {
      setCertificates(certificate);
    }
  }, [certificate]);

  // Hàm tìm kiếm chứng chỉ bằng API
  const handleSearch = async () => {
    refetchCertificates(keyword); // Gửi từ khóa lên server để tìm kiếm
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  // Nhấn enter sẽ tự đồng tìm kiếm
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <header className="bg-purple-500 p-6 text-center text-white text-2xl font-bold">
          Take your career to the next level with certificates
        </header>

        {/* Filter Section */}
        <div className="p-4 text-center">
          <div className="relative mb-6 w-1/2 m-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={changeKeyword}
              value={keyword}
              onKeyPress={handleKeyPress}
            />
            <button
              className="absolute right-3 top-2 text-black"
              onClick={handleSearch}
            >
              🔍
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {certificates.map((cert, index) => (
              <CertificateCard
                key={index}
                {...cert}
              />
            ))}
          </div>
        ) : (
          <div className="w-1/3 h-1/12 m-auto rounded-xl">
            <img
              className="w-full rounded-xl shadow"
              src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
              alt="course not found"
            />
            <p>
              We can't get course now. Please retry later or back to
              <Link
                className="text-blue-500"
                to="/"
              >
                HOMEPAGE
              </Link>
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          <button className="mr-2">{"<"}</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className="mx-1 px-3 py-1 border rounded-full bg-purple-500 text-white"
            >
              {page}
            </button>
          ))}
          <button className="ml-2">{">"}</button>
        </div>

        {/* Designed for working adults section */}
        <div className="bg-white p-6 shadow-md flex flex-row items-center">
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Designed for working adults
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Enroll in flexible, 100% online degree programs. Set your own
              schedule to balance your work and personal commitments and
              complete coursework at your own pace.
            </p>
          </div>
          <div className="flex w-1/2 justify-end space-x-6">
            {topCert.map((cert) => (
              <CertificateCard
                {...cert}
                key={cert.certId}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="p-6 mt-6 bg-violet-200">
          <h3 className="text-center text-xl mb-4 font-bold">
            Hear why students enjoy learning
          </h3>
          <div className="flex justify-center">
            <div className="w-3/4 bg-white p-4 shadow-md rounded-lg flex flex-row items-center">
              <div className="w-1/2 mr-5 ">
                <img
                  src={defaultCertThumb}
                  className="w-full h-full"
                />
              </div>
              <p className="w-1/2">
                Live sessions, office hours, discussion boards—you can
                participate from wherever you are. Getting my MBA makes me feel
                empowered. I don’t need to stop working, I don’t need to stop
                being a mother, I don’t need to stop having my life.
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default CertificatePage;
