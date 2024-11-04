import { useEffect, useState } from "react";
import { allJobPaginationData } from "../../../models/jobPosition";
import useJobPosition from "../../../hooks/JobPosition/useJobPosition";
import Loading from "../../../components/UI/Loading";
import JobPositionCard from "../../../components/JobPosition/JobPositionCard";
import CertificateCard from "../../../components/Certifications/CertificateCard";
import { cardCertificate } from "../../../models/certificate";
import { Pagination } from "antd";

const Job = () => {
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

  const { job, loading, refetchJobs } = useJobPosition();
  const [jobs, setJobs] = useState<allJobPaginationData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Adjust page size as needed
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    refetchJobs(); // Fetch initial jobs
  }, []);

  useEffect(() => {
    const approvedJobs = job.filter(j => j.jobPositionPermission === 'Approve');
    setJobs(approvedJobs);
    console.log(approvedJobs);
  }, [job]);

  // Handle keyword change for searching
  useEffect(() => {
    if (keyword) {
      const filteredJobs = job.filter(j => 
        j.jobPositionName.toLowerCase().includes(keyword.toLowerCase()) &&
        j.jobPositionPermission === 'Approve'
      );
      setJobs(filteredJobs);
    } else {
      const approvedJobs = job.filter(j => j.jobPositionPermission === 'Approve');
      setJobs(approvedJobs);
    }
  }, [keyword, job]);

  // Handle pagination changes
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);

  };

  // Calculate paginated data
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll
      });
    };
    scrollToTop();
  });

  return (
    <>
      <div className="text-center py-10 bg-purple-400 text-white">
        <h1 className="text-4xl font-bold">Explore your job position</h1>
      </div>

      <div className="py-10 text-center px-5">
        <div className="relative mb-6 w-1/2 m-auto">
          <input
            type="text"
            placeholder="Search your job..."
            className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"            
            onChange={changeKeyword}
          />
          <button
            className="absolute right-3 top-2 text-black"
            onClick={() => refetchJobs(keyword)} // Optional button to trigger search
          >
            🔍
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold">All job positions</h1>
            <div className="grid grid-cols-1 gap-6 p-4 w-full">
              {paginatedJobs.map((job) => (
                <JobPositionCard
                  job={job}
                  key={job.jobPositionId}
                />
              ))}
            </div>
            {/* Pagination Component */}
            <div className="mt-6 flex justify-end">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={jobs.length}
                onChange={handlePaginationChange}
              />
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <h1 className="text-2xl font-bold">Top certificates</h1>
            <div className="grid grid-cols-1 gap-5 p-4 w-full">
              {topCert.map((cert) => (
                <CertificateCard
                  {...cert}
                  key={cert.certId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Job;
