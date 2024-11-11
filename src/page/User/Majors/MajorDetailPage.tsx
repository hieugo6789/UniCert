import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom"; 
import { allMajorPaginationData } from "../../../models/major";
import { cardCertificate } from "../../../models/certificate";
import useMajorDetail from "../../../hooks/Major/useMajorDetail";
import useFilterMajor from "../../../hooks/Major/useFilterMajor";
import CertificateCard from "../../../components/Certifications/CertificateCard";

const MajorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [major, setMajor] = useState<allMajorPaginationData | null>(null);
  const [allCerts, setAllCerts] = useState<cardCertificate[]>([]);
  const [filteredCerts, setFilteredCerts] = useState<cardCertificate[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [searchInput, setSearchInput] = useState<string>(""); // State for search input
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  const { state, getMajorDetails } = useMajorDetail();
  const { major: filteredMajor } = useFilterMajor({ jobId: selectedJob, majorId: id || '' });

  // Create a ref for the certifications header
  const certificationsHeaderRef = useRef<HTMLHeadingElement>(null);

  // Fetch Major Details
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

  // Fetch Job Details associated with the Major
  useEffect(() => {
    const getJob = () => {
      if (state?.currentMajor) {
        setMajor(state.currentMajor);
        const approvedCerts = state.currentMajor.certificationDetails
          ? state.currentMajor.certificationDetails.filter(
              (cert) => cert.permission === "Approve"
            )
          : [];
        setAllCerts(approvedCerts);
        setFilteredCerts(approvedCerts);
      }
    };
    getJob();
  }, [state]);  

  useEffect(() => {        
    console.log('filteredMajor:', filteredMajor);
    if (selectedJob === "all") {
      setFilteredCerts(allCerts);
    } else {
      const approvedCerts = filteredMajor?.flatMap(major => 
        major.certificationDetails?.filter(cert => cert.permission === "Approve") || []
      ) || [];
      
      setFilteredCerts(approvedCerts);
    }
    return;
  }, [selectedJob, filteredMajor, allCerts]);

  // Handle filtering by job position  
  const handleJobPositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJob(event.target.value);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    const searchResults = allCerts.filter(cert =>
      cert.certName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCerts(searchResults);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll to the certifications header
    if (certificationsHeaderRef.current) {
      certificationsHeaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!major) {
    return <div>Major not found.</div>;
  }
  if (!major.jobPositionDetails) {
    return <div>Job Position not found.</div>;
  }

  // Calculate the items to display based on the current page
  const indexOfLastCert = currentPage * itemsPerPage;
  const indexOfFirstCert = indexOfLastCert - itemsPerPage;
  const currentCerts = filteredCerts.slice(indexOfFirstCert, indexOfLastCert);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredCerts.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Major Info Section - Improved styling */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-8 rounded-2xl shadow-xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
          <span className="mr-3">🎓</span>
          {major.majorName}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold bg-purple-700 px-3 py-1 rounded-full text-sm">
              Major Code: {major.majorCode}
            </span>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">About this Major</h2>
            <div className="prose prose-invert"
              dangerouslySetInnerHTML={{
                __html: state.currentMajor.majorDescription || "",
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Section - Enhanced UI */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center" ref={certificationsHeaderRef}>
          <span className="mr-3">📜</span>
          Available Certifications
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchInput}
              onChange={handleSearchInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                transition-all duration-300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Job Position Filter */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
            <select
              className="flex-1 md:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                cursor-pointer transition-all duration-300"
              onChange={handleJobPositionChange}
            >
              <option value="all">All Job Positions</option>
              {major.jobPositionDetails
                .filter((job) => job.jobPositionPermission === "Approve")
                .map((job, index) => (
                  <option key={index} value={job.jobPositionId.toString()}>
                    {job.jobPositionName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {currentCerts.length} of {filteredCerts.length} certifications
        </div>
      </div>

      {/* Certifications Grid */}
      {currentCerts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCerts.map((cert, index) => (
            <CertificateCard key={index} {...cert} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <img
            className="w-full max-w-md mx-auto rounded-xl shadow-md mb-6"
            src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
            alt="course not found"
          />
          <p className="text-gray-600">
            No certifications found. Please try different search criteria or{" "}
            <Link className="text-purple-500 hover:text-purple-600 font-medium" to="/">
              return to homepage
            </Link>
          </p>
        </div>
      )}

      {/* Pagination - Improved styling */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 bg-white rounded-xl shadow p-4">
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full
              ${currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-purple-500 hover:bg-purple-50'
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          
          <div className="flex space-x-2 mx-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full transition-all duration-300
                  ${currentPage === page
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:bg-purple-50'
                  }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full
              ${currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-purple-500 hover:bg-purple-50'
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default MajorDetailPage;
