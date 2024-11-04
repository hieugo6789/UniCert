import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom"; 
import { allMajorPaginationData } from "../../../models/major";
import { cardCertificate } from "../../../models/certificate";
import useMajorDetail from "../../../hooks/Major/useMajorDetail";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
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
  const { state: jobState, getJobDetails } = useJobDetail();

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
    setFilteredCerts([]);
    if (selectedJob === "all")
    setFilteredCerts(allCerts);
    else
      getJobDetails(selectedJob);
    return;
  }, [selectedJob]);

  useEffect(() => {
    if (jobState.currentJob) {
      const approvedJobCerts = jobState.currentJob.certificationDetails
        ? jobState.currentJob.certificationDetails.filter(
            (cert) => cert.permission === "Approve"
          )
        : [];
      setFilteredCerts(approvedJobCerts);
    }
  }, [jobState.currentJob]);  

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
    <div className="p-6">
      {/* Major Info Section */}
      <div className="bg-purple-500 text-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-4xl font-bold">{major.majorName}</h1>
        <div className="mt-4">
          <span className="font-semibold">Major Code:</span> {major.majorCode}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Major Description:</span>{" "}
          <div
            dangerouslySetInnerHTML={{
              __html: state.currentMajor.majorDescription || "",
            }}
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-6 text-left" ref={certificationsHeaderRef}>
          Certifications for this major
        </h2>
        <div className="relative mb-6 w-full m-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput} // Bind input value to searchInput state
            onChange={handleSearchInputChange} // Update search input
            className="bg-gray-300 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-2 text-black">🔍</span>
        </div>
        <div className="flex flex-row items-center">
          <p className="mr-3">Filter by</p>
          <div>
            <label className="sr-only">Job Position</label>
            <select
              id="jobPosition"
              name="jobPosition"
              className="h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
      </div>

      {/* Certifications Grid */}
      {currentCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {currentCerts.map((cert, index) => (
            <CertificateCard
              key={index}
              {...cert}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <img
            className="w-full rounded-xl shadow"
            src="https://dmf76jm51vpov.cloudfront.net/www2/images/main/2020/webpage/Course-not-Found.jpg"
            alt="course not found"
          />
          <p>
            We can't get course now. Please retry later or back to{" "}
            <Link className="text-blue-500" to="/">HOMEPAGE</Link>
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center p-4">
        <button
          className={`mr-2 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 border rounded-full ${
              currentPage === page
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`ml-2 ${
            currentPage === totalPages ? "cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default MajorDetailPage;
