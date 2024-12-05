import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import useAllCertification from "../../../hooks/Certification/useAllCertification";
import { allCertificationData } from "../../../models/certificate";
import useGetSelectedCert from "../../../hooks/Certification/useGetSelectedCert";
import Cookies from "js-cookie";
import { showToast } from '../../../utils/toastUtils';
import { useNavigate } from "react-router-dom";
import useRecommendedJobs from "../../../hooks/JobPosition/useRecommendedJob";
import { currentJob } from "../../../models/jobPosition";
import useDeleteSelectedCert from "../../../hooks/Certification/useDeleteSelectedCert";
import { useCreateSelectedCert } from "../../../hooks/Certification/useCreateSelectedCert";
import PathwayModal from "./PathwayModal";

const Pathway = () => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const { certificate } = useAllCertification();
  const { certificate: selectCert, fetchSelectedCert } = useGetSelectedCert();
  const [selectedCerts, setSelectedCerts] = useState<allCertificationData[]>([]);
  const [certificates, setCertificates] = useState<allCertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobPositions, setJobPositions] = useState<currentJob[]>([]);
  const { recommendedJobs, refetchRecommendedJobs } = useRecommendedJobs();
  const { handleDeleteCertificate } = useDeleteSelectedCert();
  const { handleCreateCert } = useCreateSelectedCert();

  const [jobPage, setJobPage] = useState(1); // Job pagination state
  const jobsPerPage = 5; // Number of jobs per page

  const handleRemoveCert = (certId: number) => {
    handleDeleteCertificate(Number(userId), certId);
    const updatedCerts = selectedCerts.filter((cert) => cert.certId !== certId);
    setSelectedCerts(updatedCerts);
  };

  const handleAddCert = (certId: number) => {
    handleCreateCert({
      userId: Number(userId),
      certificationId: [certId]
    });
    const updatedCerts = certificates.filter((cert) => cert.certId === certId);
    setSelectedCerts([...selectedCerts, ...updatedCerts]);
  };

  const handleCompleteCert = (certId: number) => {
    const certToAdd = certificates.find(cert => cert.certId === certId);
    if (certToAdd) {
      handleAddCert(certId);
    }
  };

  useEffect(() => {
    if (userId && selectedCerts.length > 0) {
      refetchRecommendedJobs(userId?.toString() || "0");
    }
  }, [selectedCerts.length, userId, refetchRecommendedJobs]);

  useEffect(() => {
    setSelectedCerts(selectCert);
    refetchRecommendedJobs(userId?.toString() || "0");
  }, [selectCert, userId]);

  useEffect(() => {
    if (recommendedJobs) {
      setJobPositions(recommendedJobs);
    }
  }, [recommendedJobs]);

  useEffect(() => {
    const approvedCertificates = certificate.filter((c) => c.permission === "Approve");
    setCertificates(approvedCertificates);
  }, [certificate]);

  useEffect(() => {
    if (!userId) {
      showToast("Please login to access this page", "error");
      navigate('/login');
      return;
    }
    fetchSelectedCert(userId);
  }, [userId]);

  const handleJobCardClick = (job: any) => {
    setSelectedJob(job.jobPositionId);
    setIsModalOpen(true);
  };

  const filteredCerts = certificates.filter((cert) =>
    cert.certName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Pagination Logic for Jobs
  const indexOfLastJob = jobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobPositions.slice(indexOfFirstJob, indexOfLastJob);

  const uniqueOrganizations = Array.from(
    new Set(selectedCerts.map(cert => cert.organizeId))
  ).map(id => {
    const org = selectedCerts.find(cert => cert.organizeId === id);
    return {
      id: org?.organizeId ?? 0,
      name: org?.organizeName ?? ''
    };
  }).filter(org => org.id !== 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Multi-Select Component */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select Certifications</h2>
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {selectedCerts.map((cert) => (
              <span
                key={cert.certId}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {cert.certName}
                <FaTimes
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCert(cert.certId);
                  }}
                />
              </span>
            ))}
          </div>

          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
            <div className="p-2 border-b">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 300)}
                />
              </div>
            </div>
            {isDropdownOpen && (
              <div className="max-h-60 overflow-y-auto mb-2">
                {filteredCerts.map((cert) => {
                  const isSelected = selectedCerts.some(selectedCert => selectedCert.certId === cert.certId);
                  return (
                    <div
                      key={cert.certId}
                      className={`p-2 ${isSelected ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100 cursor-pointer'}`}
                      onClick={() => !isSelected && handleAddCert(cert.certId)} // Prevent adding if already selected
                    >
                      {cert.certName}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8 mt-[100px]">
        <h2 className="text-2xl font-bold mb-4">Recommended Positions</h2>
        <div className="grid grid-cols-1 gap-6">
          {currentJobs.map((job) => (
            <div
              key={job.jobPositionId}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 text-left hover:shadow-lg cursor-pointer duration-300 ease-in-out hover:scale-[1.02]"
              onClick={() => handleJobCardClick(job)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                    {job.jobPositionName}
                  </h2>
                  <span className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full">
                    {job.jobPositionCode}
                  </span>
                </div>

                <div
                  className="prose text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: job.jobPositionDescription || "" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls for Jobs */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => setJobPage(jobPage - 1)}
          disabled={jobPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => setJobPage(jobPage + 1)}
          disabled={indexOfLastJob >= jobPositions.length}
        >
          Next
        </button>
      </div>

      <PathwayModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Pathway" 
        jobId={selectedJob || "0"} 
        selectedCertIds={selectedCerts.map(cert => cert.certId)}
        organizations={uniqueOrganizations}
        onCompleteCert={handleCompleteCert}
      />
    </div>
  );
};

export default Pathway;

