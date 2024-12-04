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

  useEffect(() => {
    if (props.isOpen) {
      jobDetailByOrganize(Number(props.jobId));
    }
  }, [props.isOpen, props.jobId]);

  useEffect(() => {
    if (state?.currentJob) {
      const jobDetailItem = state?.currentJob as any;
      setJob(jobDetailItem?.[0] ?? null);
      setCertList(jobDetailItem?.[0]?.certificationTwoId ?? []);
    }
  }, [state]);

  const calculateProgress = () => {
    if (!job?.certificationDetails) return 0;
    const completed = job.certificationDetails.filter(
      (cert) => cert.certValidity === "Completed"
    ).length;
    return Math.round((completed / job.certificationDetails.length) * 100);
  };

  const shortenDescription = (description: string) => {
    return description.length > 300
      ? `${description.substring(0, 300)}...`
      : description
  }
  const navigate = useNavigate();
  return (
    <CustomModal isOpen={props.isOpen} onClose={props.onClose} title={props?.title || "Job"} size="full">
      <div className="p-4 max-h-[80vh] overflow-y-auto">
        {job ? (
          <>
            <h2 className="text-lg font-bold">{job.jobPositionName}</h2>
            <p className="text-sm text-gray-600">{job.jobPositionDescription}</p>

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
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{cert.certName}</h4>
                      {/* <p className="text-sm text-gray-600">{cert.certDescription}</p> */}
                      <div className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: shortenDescription(cert.certDescription) || "",
                        }}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={()=>navigate(`/certificate/${cert.certId}`)}
                        >
                          <FaLink />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-md">
                          <FaCheck />
                          <span>Completed</span>
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
