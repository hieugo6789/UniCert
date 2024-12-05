import { useEffect, useState } from "react";
import CustomModal from "../../../components/UI/CustomModal";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import { allJobPaginationData } from "../../../models/jobPosition";
import { FaArrowDown, FaBook, FaCheck, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  jobId: string;
  selectedCertIds: number[];
  organizations: { id: number; name: string }[];
  onCompleteCert: (certId: number) => void;
}

interface certTab {
  certCode: string;
  certDescription: string;
  certId: number;
  certImage: string;
  certName: string;
  typeName: string;
  organizeId: number;
}

interface CertLevel {
  [key: string]: certTab[];
}

const PathwayModal = (props: ModalProps) => {
  const [job, setJob] = useState<allJobPaginationData | null>(null);
  const { state, jobDetailByOrganize } = useJobDetail();
  const [certList, setCertList] = useState<certTab[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<number | undefined>(undefined);  

  useEffect(() => {
    if (props.isOpen && props.jobId && selectedOrg) {
      jobDetailByOrganize(Number(props.jobId), selectedOrg);
    }
  }, [props.isOpen, props.jobId, selectedOrg]);

  useEffect(() => {
    if (state?.currentJob) {
      const jobDetailItem = state?.currentJob as any;
      setJob(jobDetailItem?.[0] ?? null);
      setCertList(jobDetailItem?.[0]?.certificationTwoId ?? []);
    }    
  }, [state]);

  useEffect(() => {
    if (props.isOpen) {
      if (props.organizations.length > 0 && selectedOrg === undefined) {
        setSelectedOrg(props.organizations[0].id);
      }
    }
  }, [props.isOpen, props.organizations]);

  const calculateProgress = () => {
    if (!certList || certList.length === 0) return 0;
    
    const completedCerts = certList.filter(cert => 
      props.selectedCertIds.includes(cert.certId)
    ).length;
    
    return Math.round((completedCerts / certList.length) * 100);
  };

  const shortenDescription = (description: string) => {
    return description.length > 300
      ? `${description.substring(0, 300)}...`
      : description;
  };

  const navigate = useNavigate();

  const groupCertsByLevel = (certs: certTab[]) => {
    const grouped: CertLevel = {};
    certs.forEach(cert => {
      const level = cert.typeName || 'Other';
      if (!grouped[level]) {
        grouped[level] = [];
      }
      grouped[level].push(cert);
    });
    return grouped;
  };

  return (
    <CustomModal isOpen={props.isOpen} onClose={props.onClose} title={props?.title || "Job"} size="full">
      <div className="p-6 max-h-[80vh] overflow-y-auto">        
        {job ? (
          <>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                {job.jobPositionName}
              </h2>
              <div 
                className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" 
                dangerouslySetInnerHTML={{
                  __html: job.jobPositionDescription || "",
                }} 
              />
            </div>

            <div className="grid gap-6 md:grid-cols-[300px,1fr]">
              <div className="space-y-6">
                {/* Organization Select */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Select Organization
                  </label>
                  <select
                    value={selectedOrg || ""}
                    onChange={(e) => setSelectedOrg(Number(e.target.value))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-transparent focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >                
                    {props.organizations.map(org => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>

                {/* Progress Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-white">
                    <FaBook className="text-purple-500" /> Progress
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-purple-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                    {calculateProgress()}% completed
                  </p>
                </div>
              </div>

              {/* Certificates Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-6 text-gray-800 dark:text-white">
                  <FaArrowDown className="text-purple-500" /> Pathway
                </h3>
                
                {Object.entries(groupCertsByLevel(certList)).map(([level, certs]) => (
                  <div key={level} className="mb-8 last:mb-0">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        {level}
                      </h4>
                      <div className="h-[1px] flex-1 bg-purple-200 dark:bg-purple-800"></div>
                    </div>
                    <div className="grid gap-4">
                      {certs.map((cert) => (
                        <div 
                          key={cert.certId} 
                          className={`relative flex gap-4 p-4 rounded-xl border transition-all ${
                            props.selectedCertIds.includes(cert.certId)
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={cert.certImage}
                              alt={cert.certName}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            {props.selectedCertIds.includes(cert.certId) && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5">
                                <FaCheck size={12} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                {cert.certName}
                                {props.selectedCertIds.includes(cert.certId) && (
                                  <span className="text-sm text-green-500 font-normal">Completed</span>
                                )}
                              </h4>
                              <div className="flex gap-2">
                                <button
                                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                                  onClick={() => navigate(`/certificate/${cert.certId}`)}                          
                                >
                                  <FaLink size={12} />
                                  <span>Details</span>
                                </button>
                                <button                           
                                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                    props.selectedCertIds.includes(cert.certId) 
                                      ? 'bg-gray-300 cursor-not-allowed' 
                                      : 'bg-green-500 hover:bg-green-600 text-white'
                                  }`}
                                  disabled={props.selectedCertIds.includes(cert.certId)}
                                  onClick={() => props.onCompleteCert(cert.certId)}
                                >
                                  <FaCheck size={12} />
                                  <span>Complete</span>
                                </button>
                              </div>
                            </div>
                            <div 
                              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                              dangerouslySetInnerHTML={{
                                __html: shortenDescription(cert.certDescription) || "",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default PathwayModal;
