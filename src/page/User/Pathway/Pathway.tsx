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
  // const [activeTab, setActiveTab] = useState<TabType>('frontend');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobPositions, setJobPositions] = useState<currentJob[]>([]);
  const { recommendedJobs, refetchRecommendedJobs } = useRecommendedJobs();
  const { handleDeleteCertificate } = useDeleteSelectedCert();
  const { handleCreateCert } = useCreateSelectedCert();
  const handleRemoveCert = (certId: number) => {
    handleDeleteCertificate(Number(userId), certId);
    const updatedCerts = selectedCerts.filter((cert) => cert.certId !== certId);
    setSelectedCerts(updatedCerts);
    console.log(updatedCerts);
  };
  
  
  const handleAddCert = (certId: number) => {
    handleCreateCert({
      userId: Number(userId),
      certificationId: [certId]
    });
    const updatedCerts = certificates.filter((cert) => cert.certId === certId);
    setSelectedCerts([...selectedCerts, ...updatedCerts]);
  };
  
  
  useEffect(() => {
    refetchRecommendedJobs(userId?.toString() || "0"); // Thay "userId" bằng ID người dùng thực tế
  }, [userId]);

  useEffect(() => {
    setSelectedCerts(selectCert);
  }, [selectCert]); // Chỉ phụ thuộc vào selectCert, không phụ thuộc vào selectedCerts nữa

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
    fetchSelectedCert(userId); // Thay "userId" bằng ID người dùng thực tế
  }, [userId]);


  const handleJobCardClick = (job: any) => {
    setSelectedJob(job.jobPositionId);
    console.log(job);
    setIsModalOpen(true);
  };

  const filteredCerts = certificates.filter((cert) =>
    cert.certName.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Multi-Select Component */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select Certifications</h2>
        { }
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


          {/* {isDropdownOpen && ( */}
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
            <div className="p-2 border-b">
              <div className="relative"
              // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    // setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 300)}
                />
              </div>
            </div>
            {isDropdownOpen && (
              <div className="max-h-60 overflow-y-auto mb-2">
                {filteredCerts.map((cert) => (
                  <div
                    key={cert.certId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddCert(cert.certId)}
                  >
                    {cert.certName}
                  </div>
                ))}
              </div>)}
          </div>
          {/* )} */}
        </div>
      </div>

      {/* Job Positions Grid */}
      <div className="mb-8 mt-[100px]">
        <h2 className="text-2xl font-bold mb-4">Recommended Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPositions.map((job) => (
            <div
              key={job.jobPositionId}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => handleJobCardClick(job)}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold">{job.jobPositionName}</h3>
                <JobDescription description={job.jobPositionDescription || ""} />
              </div>
            </div>
          ))}
        </div>
      </div>
          <PathwayModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} title="Pathway" jobId={selectedJob || "0"} />

    </div>
  );
};

export default Pathway;

// Component hiển thị mô tả công việc với "More/Less"
const JobDescription: React.FC<{ description: string }> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50; // Số ký tự giới hạn

  const getDisplayText = () => {
    if (isExpanded || description.length <= MAX_LENGTH) {
      return description;
    }
    return description.slice(0, MAX_LENGTH) + "...";
  };

  return (
    <div className="">
      <div
        dangerouslySetInnerHTML={{
          __html: getDisplayText(),
        }}
      />
      {description.length > MAX_LENGTH && (
        <span
          className="text-blue-500 dark:text-blue-400 underline ml-2 inline block"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Less" : "More..."}
        </span>
      )}
    </div>
  );
};
