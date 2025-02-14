import { useEffect, useState } from "react";
import { allJobPaginationData } from "../../../models/jobPosition";
import useJobPosition from "../../../hooks/JobPosition/useJobPosition";
import Loading from "../../../components/UI/Loading";
import JobPositionCard from "../../../components/JobPosition/JobPositionCard";
import CertificateCard from "../../../components/Certifications/CertificateCard";
import useTopCert from "../../../hooks/Certification/useTopCert";

const Job = () => {
  const { certificate } = useTopCert({ topN: 2 });

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
    setCurrentPage(1);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-700 dark:to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Your Career Path
          </h1>
          <p className="text-lg text-purple-100">
            Discover job positions that match your skills and aspirations
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for job positions..."
            className="w-full px-6 py-4 rounded-full shadow-lg border-2 border-transparent
            focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 
            focus:border-purple-500 dark:focus:border-purple-700
            transition-all duration-300 ease-in-out transform
            hover:shadow-xl focus:scale-[1.02]
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={changeKeyword}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 
            transition-colors duration-300"            
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 transform hover:scale-110 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Available Positions</h2>
            <div className="space-y-6">
              {paginatedJobs.map((job) => (
                <JobPositionCard job={job} key={job.jobPositionId} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex flex-col items-center space-y-4">
              {/* Pagination Info */}
              <div className="text-gray-600 dark:text-gray-300">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, jobs.length)} of {jobs.length} job positions
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center space-x-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePaginationChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg 
                    bg-gradient-to-r from-purple-600/30 to-indigo-600/30
                    backdrop-blur-sm
                    border-2 border-purple-500/30 dark:border-purple-400/30
                    hover:border-purple-500 dark:hover:border-purple-400
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:scale-105 transition-all duration-300
                    shadow-lg dark:shadow-purple-900/30"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-2">
                  {[...Array(Math.ceil(jobs.length / pageSize))].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePaginationChange(index + 1)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center
                        transition-all duration-300
                        ${currentPage === index + 1 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30'}
                        backdrop-blur-sm
                        border-2 border-purple-500/30 dark:border-purple-400/30
                        hover:border-purple-500 dark:hover:border-purple-400
                        hover:scale-105
                        shadow-lg dark:shadow-purple-900/30`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => handlePaginationChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(jobs.length / pageSize)}
                  className="px-4 py-2 rounded-lg
                    bg-gradient-to-r from-purple-600/30 to-indigo-600/30
                    backdrop-blur-sm
                    border-2 border-purple-500/30 dark:border-purple-400/30
                    hover:border-purple-500 dark:hover:border-purple-400
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:scale-105 transition-all duration-300
                    shadow-lg dark:shadow-purple-900/30"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Top Certificates</h2>
            <div className="space-y-4">
              {certificate.map((cert) => (
                <CertificateCard {...cert} key={cert.certId} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Job;
