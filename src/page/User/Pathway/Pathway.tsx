import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes, FaCertificate, FaBriefcase, FaArrowRight, FaArrowLeft } from "react-icons/fa";
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

interface OrgType {
  id: number;
  name: string;
}

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
  const [jobCertOrganizes, setJobCertOrganizes] = useState<OrgType[]>([]);

  const [jobPage, setJobPage] = useState(1); // Job pagination state
  const jobsPerPage = 5; // Number of jobs per page

  const handleRemoveCert = async (certId: number) => {
    try {
      await handleDeleteCertificate(Number(userId), certId);
      const updatedCerts = selectedCerts.filter((cert) => cert.certId !== certId);
      setSelectedCerts(updatedCerts);
      showToast("Certificate removed successfully", "success");
  
      // Gọi refetchRecommendedJobs sau khi xóa thành công
      refetchRecommendedJobs(userId?.toString() || "0");
    } catch (error) {
      console.error("Failed to remove certificate:", error);
      showToast("Failed to remove certificate", "error");
    }
  };
  

  const handleAddCert = async (certId: number) => {
    try {
      await handleCreateCert({
        userId: Number(userId),
        certificationId: [certId]
      });
      const updatedCerts = certificates.filter((cert) => cert.certId === certId);
      setSelectedCerts([...selectedCerts, ...updatedCerts]);
      showToast("Certificate added successfully", "success");
  
      // Gọi refetchRecommendedJobs sau khi thêm thành công
      refetchRecommendedJobs(userId?.toString() || "0");
    } catch (error) {
      console.error("Failed to add certificate:", error);
      showToast("Failed to add certificate", "error");
    }
  };
  

  const handleCompleteCert = (certId: number) => {
    const certToAdd = certificates.find(cert => cert.certId === certId);
    if (certToAdd) {
      handleAddCert(certId);
    }
  };

  // useEffect(() => {
  //   if (userId && selectedCerts.length > 0) {
  //     refetchRecommendedJobs(userId?.toString() || "0");
  //   }
  //   else {
  //     setJobPositions([]);
  //   }
  // }, [userId, selectedCerts.length]);

  useEffect(() => {
    setSelectedCerts(selectCert);
    refetchRecommendedJobs(userId?.toString() || "0");
  }, [selectCert]);

  useEffect(() => {
    if (Array.isArray(recommendedJobs)) {
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
    setJobCertOrganizes([]);
    setIsModalOpen(true);
    const uniqueOrgs = Array.from(
      new Map<number, OrgType>(
        job.certOrganizes.map((org: any) => [
          org?.organizeId,
          {
            id: org?.organizeId ?? 0,
            name: org?.organizeName ?? ''
          } as OrgType
        ])
      ).values()
    ).filter((org): org is OrgType => org.id !== 0);
        
    setJobCertOrganizes(uniqueOrgs);
  };

  const filteredCerts = certificates.filter((cert) =>
    cert.certName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Pagination Logic for Jobs
  const indexOfLastJob = jobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobPositions.slice(indexOfFirstJob, indexOfLastJob);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Selected Certifications Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
          <FaCertificate className="text-purple-500" />
          Your Certifications
        </h2>
        <div className="relative">
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedCerts.map((cert) => (
              <div
                key={cert.certId}
                className="group flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-lg transition-all hover:shadow-md"
              >
                <img 
                  src={cert.certImage} 
                  alt={cert.certName} 
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{cert.certName}</span>
                <button
                  className="ml-2 text-purple-400 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCert(cert.certId);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2 border dark:border-gray-700 rounded-lg p-3 mb-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredCerts.map((cert) => {
                  const isSelected = selectedCerts.some(selectedCert => selectedCert.certId === cert.certId);
                  return (
                    <div
                      key={cert.certId}
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      onClick={() => !isSelected && handleAddCert(cert.certId)}
                    >
                      <img 
                        src={cert.certImage} 
                        alt={cert.certName} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{cert.certName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{cert.typeName}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Positions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <FaBriefcase className="text-purple-500" />
          Recommended Positions
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {currentJobs.map((job) => (
            <div
              key={job.jobPositionId}
              onClick={() => handleJobCardClick(job)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500 dark:hover:border-purple-400"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {job.jobPositionName}
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium">
                    {job.jobPositionCode}
                  </span>
                </div>
                <div
                  className="prose dark:prose-invert text-gray-600 dark:text-gray-300 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: job.jobPositionDescription || "" }}
                />
                <div className="flex justify-end">
                  <button className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 font-medium flex items-center gap-1">
                    View Pathway <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              jobPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
            onClick={() => setJobPage(jobPage - 1)}
            disabled={jobPage === 1}
          >
            <FaArrowLeft /> Previous
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              indexOfLastJob >= jobPositions.length
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
            onClick={() => setJobPage(jobPage + 1)}
            disabled={indexOfLastJob >= jobPositions.length}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>

      <PathwayModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Pathway" 
        jobId={selectedJob || "0"} 
        selectedCertIds={selectedCerts.map(cert => cert.certId)}
        organizations={jobCertOrganizes}
        onCompleteCert={handleCompleteCert}
      />
    </div>
  );
};

export default Pathway;

