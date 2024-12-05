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

  return (
    <CustomModal isOpen={props.isOpen} onClose={props.onClose} title={props?.title || "Job"} size="full">
      <div className="p-4 max-h-[80vh] overflow-y-auto">        
        {job ? (
          <>
            <h2 className="text-lg font-bold">{job.jobPositionName}</h2>
            <div className="text-sm text-gray-600" 
              dangerouslySetInnerHTML={{
              __html: shortenDescription(job.jobPositionDescription) || "",
              }} 
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Organization</label>
              <select
                value={selectedOrg || ""}
                onChange={(e) => setSelectedOrg(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              >                
                {props.organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-semibold flex items-center gap-2">
                <FaBook /> Certifications Progress
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {calculateProgress()}% completed
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-semibold flex items-center gap-2">
                <FaArrowDown /> Certificate Details
              </h3>
              <ul className="mt-2 overflow-y-auto">
                {certList.map((cert) => (
                  <li key={cert.certId} className="mb-4 flex items-center gap-4">
                    {/* Certificate Image */}
                    <div className="relative">
                      <img
                        src={cert.certImage}
                        alt={cert.certName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      {props.selectedCertIds.includes(cert.certId) && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                          <FaCheck size={12} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        {cert.certName}
                        {props.selectedCertIds.includes(cert.certId) && (
                          <span className="text-sm text-green-500">Completed</span>
                        )}
                      </h4>
                      <div 
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: shortenDescription(cert.certDescription) || "",
                        }}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md "
                          onClick={() => navigate(`/certificate/${cert.certId}`)}                          
                        >
                          <FaLink />
                          <span>View Details</span>
                        </button>
                        <button                           
                          className={`flex items-center gap-1 px-2 py-1 ${
                            props.selectedCertIds.includes(cert.certId) 
                              ? 'bg-gray-300' 
                              : 'bg-green-500 hover:bg-green-600'
                          } text-white rounded-md`}
                          disabled={props.selectedCertIds.includes(cert.certId)}
                          onClick={() => props.onCompleteCert(cert.certId)}
                        >
                          <FaCheck />
                          <span>Complete</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Loading job details...</p>
        )}
      </div>
    </CustomModal>
  );
};

export default PathwayModal;
