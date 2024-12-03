import { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaChevronDown, FaLaptopCode, FaDatabase, FaCloud, FaArrowDown, FaLink, FaBook, FaDollarSign, FaCheck, FaBuilding } from "react-icons/fa";
import useAllCertification from "../../../hooks/Certification/useAllCertification";
import { allCertificationData } from "../../../models/certificate";
import useGetSelectedCert from "../../../hooks/Certification/useGetSelectedCert";
import { useCreateSelectedCert } from "../../../hooks/Certification/useCreateSelectedCert";
import useDeleteSelectedCert from "../../../hooks/Certification/useDeleteSelectedCert";
import Cookies from "js-cookie";
import { showToast } from '../../../utils/toastUtils';
import { useNavigate } from "react-router-dom";

interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  certImage: string;
  prerequisites: string;
  resources: string[];
  cost: string;
  provider: string;
  progress: number;
  organization: string;
  orgLogo: string;
}

// Add interface for job position
interface JobPosition {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: JSX.Element;
  tabType: TabType;
}

const Modal = ({ isOpen, onClose, children, title } : any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add type for valid tabs
type TabType = 'frontend' | 'backend' | 'cloud';

const Pathway = () => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();  
  const { certificate } = useAllCertification();
  const { certificate: selectCert, fetchSelectedCert } = useGetSelectedCert();
  const { handleCreateCert } = useCreateSelectedCert();
  const { handleDeleteCertificate } = useDeleteSelectedCert();
  const [certificates, setCertificates] = useState<allCertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('frontend');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);  

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
    console.log("Test")
  }, [userId]);

  const jobPositions = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Specialized in creating user interfaces using modern frameworks",
      image: "images.unsplash.com/photo-1498050108023-c5249f4df085",
      icon: <FaLaptopCode className="text-blue-500 text-2xl" />,
      tabType: "frontend"
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Expert in server-side logic and database management",
      image: "images.unsplash.com/photo-1504639725590-34d0984388bd",
      icon: <FaDatabase className="text-green-500 text-2xl" />,
      tabType: "backend"
    },
    {
      id: 3,
      title: "Cloud Architect",
      description: "Design and implement cloud infrastructure solutions",
      image: "images.unsplash.com/photo-1451187580459-43490279c0fa",
      icon: <FaCloud className="text-purple-500 text-2xl" />,
      tabType: "cloud"
    }
  ];

  const roadmaps = {
    frontend: [
      { 
        step: 1, 
        title: "HTML/CSS Fundamentals", 
        duration: "2 months",
        certImage: "images.unsplash.com/photo-1621839673705-6617adf9e890",
        prerequisites: "Basic computer knowledge",
        resources: ["MDN Web Docs", "FreeCodeCamp", "W3Schools"],
        cost: "Free",
        provider: "https://www.w3.org/",
        progress: 100,
        organization: "W3C",
        orgLogo: "images.unsplash.com/photo-1599305445671-ac291c95aaa9"
      },
      { 
        step: 2, 
        title: "JavaScript Mastery", 
        duration: "3 months",
        certImage: "images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
        prerequisites: "HTML/CSS knowledge",
        resources: ["JavaScript.info", "Eloquent JavaScript", "JavaScript30"],
        cost: "$20/month",
        provider: "https://javascript.info/",
        progress: 60,
        organization: "JavaScript Foundation",
        orgLogo: "images.unsplash.com/photo-1633356122544-f134324a6cee"
      },
      { 
        step: 3, 
        title: "React Certification", 
        duration: "4 months",
        certImage: "images.unsplash.com/photo-1633356122544-f134324a6cee",
        prerequisites: "JavaScript proficiency",
        resources: ["React Docs", "React Tutorial", "React Patterns"],
        cost: "$50/month",
        provider: "https://reactjs.org/",
        progress: 30,
        organization: "Meta",
        orgLogo: "images.unsplash.com/photo-1633356122544-f134324a6cee"
      }
    ],
    backend: [
      { 
        step: 1, 
        title: "Python Basics", 
        duration: "2 months",
        certImage: "images.unsplash.com/photo-1526379095098-d400fd0bf935",
        prerequisites: "None",
        resources: ["Python.org", "Python Crash Course", "Codecademy"],
        cost: "Free",
        provider: "https://www.python.org/",
        progress: 80,
        organization: "Python Foundation",
        orgLogo: "images.unsplash.com/photo-1526379095098-d400fd0bf935"
      },
      { 
        step: 2, 
        title: "Database Management", 
        duration: "3 months",
        certImage: "images.unsplash.com/photo-1544383835-bda2bc66a55d",
        prerequisites: "Basic Python",
        resources: ["SQL Tutorial", "PostgreSQL Docs", "MongoDB University"],
        cost: "$30/month",
        provider: "https://www.mongodb.com/",
        progress: 40,
        organization: "MongoDB Inc",
        orgLogo: "images.unsplash.com/photo-1544383835-bda2bc66a55d"
      },
      { 
        step: 3, 
        title: "API Development", 
        duration: "3 months",
        certImage: "images.unsplash.com/photo-1516259762381-22954d7d3ad2",
        prerequisites: "Python and Database knowledge",
        resources: ["FastAPI", "Django REST", "Flask"],
        cost: "$40/month",
        provider: "https://fastapi.tiangolo.com/",
        progress: 20,
        organization: "FastAPI",
        orgLogo: "images.unsplash.com/photo-1516259762381-22954d7d3ad2"
      }
    ],
    cloud: [
      { 
        step: 1, 
        title: "Cloud Fundamentals", 
        duration: "2 months",
        certImage: "images.unsplash.com/photo-1535557597501-0fee0a500c57",
        prerequisites: "Basic IT knowledge",
        resources: ["AWS Basics", "Cloud Computing Intro", "Azure Fundamentals"],
        cost: "Free",
        provider: "https://aws.amazon.com/",
        progress: 90,
        organization: "Amazon Web Services",
        orgLogo: "images.unsplash.com/photo-1535557597501-0fee0a500c57"
      },
      { 
        step: 2, 
        title: "AWS/Azure Core Services", 
        duration: "4 months",
        certImage: "images.unsplash.com/photo-1451187580459-43490279c0fa",
        prerequisites: "Cloud Fundamentals",
        resources: ["AWS Documentation", "Azure Learning Path", "Cloud Labs"],
        cost: "$60/month",
        provider: "https://azure.microsoft.com/",
        progress: 50,
        organization: "Microsoft Azure",
        orgLogo: "images.unsplash.com/photo-1451187580459-43490279c0fa"
      },
      { 
        step: 3, 
        title: "Cloud Security", 
        duration: "3 months",
        certImage: "images.unsplash.com/photo-1562813733-b31f71025d54",
        prerequisites: "Core Services knowledge",
        resources: ["Security Best Practices", "Compliance Guide", "Security Tools"],
        cost: "$70/month",
        provider: "https://www.cloudflare.com/",
        progress: 10,
        organization: "Cloudflare",
        orgLogo: "images.unsplash.com/photo-1562813733-b31f71025d54"
      }
    ]
  };

  const handleCertSelect = (cert: any) => {
    if (!selectCert.find((c) => c.certId === cert.certId)) {      
      handleCreateCert({ userId: Number(userId) , certificateId: [cert.certId] }); // Thay "userId" bằng ID người dùng thực tế
    }
    setIsDropdownOpen(false);
  };

  const handleCertRemove = (certId: any) => {    
    handleDeleteCertificate(certId);
  };

  const handleJobCardClick = (job: any) => {
    setSelectedJob(job);
    setActiveTab(job.tabType);
    setIsModalOpen(true);
  };

  const filteredCerts = certificates.filter((cert) =>
    cert.certName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedRoadmap = (tab: keyof typeof roadmaps) => {
    const steps = roadmaps[tab];
    const grouped: Record<string, RoadmapStep[]> = {};
    steps.forEach(step => {
      if (!grouped[step.organization]) {
        grouped[step.organization] = [];
      }
      grouped[step.organization].push(step);
    });
    return grouped;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Multi-Select Component */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select Certifications</h2>
        <div className="relative">
          <div
            className="border rounded-lg p-4 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {selectCert.map((cert) => (
                  <span
                    key={cert.certId}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {cert.certName}
                    <FaTimes
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCertRemove(cert.certId);
                      }}
                    />
                  </span>
                ))}
              </div>
              <FaChevronDown className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </div>
          </div>

          {isDropdownOpen && (
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
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredCerts.map((cert) => (
                  <div
                    key={cert.certId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCertSelect(cert)}
                  >
                    {cert.certName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Positions Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPositions.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => handleJobCardClick(job)}
            >
              <img
                src={`https://${job.image}`}
                alt={job.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {job.icon}
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedJob ? selectedJob.title : ""}
      >
        <div className="transition-all duration-500 ease-in-out">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round(
                    roadmaps[activeTab].reduce((acc, step) => acc + step.progress, 0) /
                    roadmaps[activeTab].length
                  )}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      roadmaps[activeTab].reduce((acc, step) => acc + step.progress, 0) /
                      roadmaps[activeTab].length
                    )}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="p-6">
              {Object.entries(groupedRoadmap(activeTab)).map(([organization, steps]) => (
                <div key={organization} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={`https://${steps[0].orgLogo}`}
                      alt={organization}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <FaBuilding className="text-blue-500" />
                        {organization}
                      </h3>
                      <p className="text-sm text-gray-600">{steps.length} certification(s)</p>
                    </div>
                  </div>

                  {steps.map((step, index) => (
                    <div key={step.step} className="mb-8 last:mb-0">
                      <div className="flex items-start">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full ${step.progress === 100 ? "bg-green-500" : "bg-blue-500"} text-white flex items-center justify-center font-bold text-xl`}>
                            {step.progress === 100 ? <FaCheck /> : step.step}
                          </div>
                          {index < steps.length - 1 && (
                            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 h-16 flex items-center">
                              <FaArrowDown className="text-gray-400 text-2xl" />
                            </div>
                          )}
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-102">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-xl font-semibold">{step.title}</h4>
                              <span className="text-sm text-gray-500">Duration: {step.duration}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <img
                                src={`https://${step.certImage}`}
                                alt={step.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-semibold flex items-center gap-2">
                                    <FaBook className="text-blue-500" /> Prerequisites
                                  </h5>
                                  <p className="text-gray-600">{step.prerequisites}</p>
                                </div>
                                <div>
                                  <h5 className="font-semibold flex items-center gap-2">
                                    <FaDollarSign className="text-green-500" /> Estimated Cost
                                  </h5>
                                  <p className="text-gray-600">{step.cost}</p>
                                </div>
                                <div>
                                  <h5 className="font-semibold flex items-center gap-2">
                                    <FaLink className="text-purple-500" /> Certification Provider
                                  </h5>
                                  <a
                                    href={step.provider}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Visit Provider
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <h5 className="font-semibold mb-2">Learning Resources</h5>
                              <ul className="list-disc list-inside text-gray-600">
                                {step.resources.map((resource, idx) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold">Progress</span>
                                <span className="text-sm text-gray-600">{step.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                                  style={{ width: `${step.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Pathway;