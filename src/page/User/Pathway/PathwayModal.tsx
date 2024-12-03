import { useEffect, useState } from "react";
import CustomModal from "../../../components/UI/CustomModal";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import { allJobPaginationData } from "../../../models/jobPosition";
import { FaArrowDown, FaBook, FaCheck, FaLink } from "react-icons/fa";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  jobId: string;
}
const PathwayModal = (props: ModalProps) => {
  const [job, setJob] = useState<allJobPaginationData>();
  const { state, jobDetailByOrganize } = useJobDetail();

  useEffect(() => {
    if(props.isOpen)
      jobDetailByOrganize(Number(props.jobId))
  }, [props.jobId]);

  useEffect(() => {
    if (state?.currentJob) {
      // setJobDetail(state.currentJob);
      const jobDetailItem = state?.currentJob as any;
      console.log(state?.currentJob);
      setJob(jobDetailItem?.[0] ?? null);
      //   setCertList(jobDetailItem?.[0]?.certificationTwoId ?? []);

    }
  }, [state]);

  return (
    <CustomModal isOpen={props.isOpen} onClose={props.onClose} title={props.title}>
      <div>Hello</div>
      <div className="transition-all duration-500 ease-in-out">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {job?.certificationDetails ? Math.round(
                  job.certificationDetails.reduce((acc, step) => acc + step.certValidity === 'Completed' ? 100 : 0, 0) /
                  job.certificationDetails.length
                ) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${job?.certificationDetails ? Math.round(
                    job.certificationDetails.reduce((acc, step) => acc + step.certValidity === 'Completed' ? 100 : 0, 0) /
                    job.certificationDetails.length
                  ) : 0}%`
                }}
              ></div>
            </div>
          </div>

          <div className="p-6">
            {job?.certificationDetails && job.certificationDetails.length > 0 ? job.certificationDetails.map((step, index) => (
              <div key={step.certId}>
                <div className="mb-12 last:mb-0">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={`https://${step.certImage}`}
                      alt={step.certName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <FaBook className="text-blue-500" />
                        {step.certName}
                      </h3>
                      <p className="text-sm text-gray-600">{step.certValidity}</p>
                    </div>
                  </div>

                  <div className="mb-8 last:mb-0">
                    <div className="flex items-start">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full ${step.certValidity === 'Completed' ? "bg-green-500" : "bg-blue-500"} text-white flex items-center justify-center font-bold text-xl`}>
                          {step.certValidity === 'Completed' ? <FaCheck /> : step.certId}
                        </div>
                        {index < job?.certificationDetails.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 h-16 flex items-center">
                            <FaArrowDown className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 hover:scale-102">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-semibold">{step.certName}</h4>
                            <span className="text-sm text-gray-500">Duration: {step.certValidity}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <img
                              src={`https://${step.certImage}`}
                              alt={step.certName}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="space-y-3">
                              <div>
                                {/* <h5 className="font-semibold flex items-center gap-2">
                                    <FaBook className="text-blue-500" /> Prerequisites
                                  </h5>
                                  <p className="text-gray-600">{step.}</p> */}
                              </div>
                              <div>
                                {/* <h5 className="font-semibold flex items-center gap-2">
                                    <FaDollarSign className="text-green-500" /> Estimated Cost
                                  </h5>
                                  <p className="text-gray-600">{step.cost}</p> */}
                              </div>
                              <div>
                                <h5 className="font-semibold flex items-center gap-2">
                                  <FaLink className="text-purple-500" /> Certification Provider
                                </h5>
                                {/* <a
                                    href={step.provider}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Visit Provider
                                  </a> */}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5 className="font-semibold mb-2">Learning Resources</h5>
                            {/* <ul className="list-disc list-inside text-gray-600">
                                {step.resources.map((resource, idx) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul> */}
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold">Progress</span>
                              <span className="text-sm text-gray-600">{step.certValidity === 'Completed' ? '100' : '0'}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${step.certValidity === 'Completed' ? '100' : '0'}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : <div>No certification details available</div>}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default PathwayModal;
