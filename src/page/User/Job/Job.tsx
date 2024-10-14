import { useEffect, useState } from "react";
import { allJobPaginationData } from "../../../models/jobPosition";
import useJobPosition from "../../../hooks/useJobPosition"
import Loading from "../../../components/UI/Loading";
import JobPositionCard from "../../../components/JobPosition/JobPositionCard";
import CertificateCard from "../../../components/Certifications/CertificateCard";
import { allCertificationData } from "../../../models/certificate";
const Job = () => {
  const [topCert] = useState<allCertificationData[]>(
    [
      {
        certId: "1",
        certName: "AWS Certified Solutions Architect",
        certCode: "AWS-CSA",
        certDescription: "The AWS Certified Solutions Architect – Associate examination is intended for individuals who perform a solutions architect role and have one or more years of hands-on experience designing available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.",
        certCost: 150,
        certPointSystem: "AWS",
        certImage: "",
        certValidity: "3 years",
        organizeName: "Amazon Web Services",
        typeName: "Associate",
        certPrerequisite: [],
        certCodePrerequisite: [],
        certDescriptionPrerequisite: [],
      },
      {
        certId: "2",
        certName: "AWS Certified Developer",
        certCode: "AWS-CD",
        certDescription: "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
        certCost: 150,
        certPointSystem: "AWS",
        certImage: "",
        certValidity: "3 years",
        organizeName: "Amazon Web Services",
        typeName: "Associate",
        certPrerequisite: [],
        certCodePrerequisite: [],
        certDescriptionPrerequisite: [],
      },
    ]
  );
  const [jobs, setJobs] = useState<allJobPaginationData[]>([]);
  const { job, loading, refetchJobs } = useJobPosition();
  useEffect(() => {
    const fetchJob = async () => {
      refetchJobs(); // Lấy tất cả chứng chỉ ban đầu
    };
    fetchJob();
  }, []);
  useEffect(() => {
    setJobs(job);
    console.log(job);
  }, [job]);
  const [keyword, setKeyword] = useState("");
 // Hàm tìm kiếm chứng chỉ bằng API
 const handleSearch = async () => {
  refetchJobs(keyword); // Gửi từ khóa lên server để tìm kiếm
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
  return <>
    <>
      <div className="text-center py-10 bg-purple-400 text-white">
        <h1 className="text-4xl font-bold">
          Explor your job position
        </h1>
      </div>

      <div className="py-10 text-center px-5">
        <div className="relative mb-6 w-1/2 m-auto">
          <input
            type="text"
            placeholder="Search your major..."
            className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={handleKeyPress}
            onChange={changeKeyword}
          />
          <button className="absolute right-3 top-2 text-black"
          onClick={handleSearch}
          >🔍</button>
        </div>
        <div className="flex flex-col md:flex-row">

          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold">All job position</h1>
            <div className="grid grid-cols-1 gap-6 p-4 w-full">
              {jobs.map((job) => (
                <JobPositionCard job={job} key={job.jobPositionId} />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/4 ">
            <h1 className="text-2xl font-bold">Top certificate</h1>
            <div className="grid grid-cols-1 gap-5 p-4 w-full">
              {topCert.map((cert) => (
                <CertificateCard {...cert} key={cert.certId} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
    {loading && (<Loading />)}
  </>;
};
export default Job;
