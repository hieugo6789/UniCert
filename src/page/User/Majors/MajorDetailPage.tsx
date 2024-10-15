import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To get the majorId from URL params
import { allMajorPaginationData } from "../../../models/major";
import useMajorDetail from "../../../hooks/useMajorDetail";
import { allCertificationData } from "../../../models/certificate";
import CertificateCard from "../../../components/Certifications/CertificateCard";
// import CertificateCard from "../../../components/Certifications/CertificateCard";

const MajorDetailPage: React.FC = () => {
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
    {
      certId: "3",
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
    {
      certId: "4",
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
  const { id } = useParams<{ id: string }>(); // Extract majorId from the URL
  const [major, setMajor] = useState<allMajorPaginationData | null>(null);

  const { state, getMajorDetails } = useMajorDetail();

  useEffect(() => {
    const getMajorDetail = async () => {
      try {
        await getMajorDetails(id);
      } catch (error) {
        console.error("Error fetching major detail:", error);
      }
    };
    getMajorDetail();
  }, [id]);
  useEffect(() => {
    if (state) {
      setMajor(state.currentMajor);
      console.log(state.currentMajor);
    }
  }, [state]);
  if (!major) {
    return <div>Major not found.</div>;
  }
  if (!major.jobPositionId) {
    return <div>Job Position not found.</div>;
  }
  return (
    <div className="p-6">
      {/* Major Info Section */}
      <div className="bg-purple-500 text-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-4xl font-bold">{major.majorName}</h1>

        <div className="mt-4">
          <span className="font-semibold">Major Code:</span> {major.majorCode}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Major Description:</span>{" "}
          {major.majorDescription}
        </div>
      </div>
      {/* foreach 1->9 */}
      {/* Filter Section */}

      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-6 text-left">
          Certifications for this major
        </h2>
        <div className="relative mb-6 w-full m-auto mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-2 text-black">🔍</span>
        </div>
        <div className="inline-block flex flex-row items-center">
          <p className="mr-3">Filter by</p>

          <div>
            <label className="sr-only">Currency</label>
            <select
              id="currency"
              name="currency"
              className="h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>Job Position</option>
              {major.jobPositionId.map((job, index) => (
                <option key={index}>{job}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {topCert.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {topCert.map((cert, index) => (
            <CertificateCard
              key={index}
              {...cert}
            />
          ))}
        </div>
      ) : (
        <div className="w-1/3 h-1/12 m-auto rounded-xl ">
          <img
            className="w-full rounded-xl shadow"
            src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
            alt="course not found"
          />
          <p>
            We can't get course now. Please retry later or back to{" "}
            <Link
              className="text-blue-500"
              to="/"
            >
              {" "}
              HOMEPAGE
            </Link>
          </p>
        </div>
      )}
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
  );
};

export default MajorDetailPage;
