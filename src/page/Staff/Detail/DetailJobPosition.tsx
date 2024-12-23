import { useNavigate, useParams } from "react-router-dom";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import { useEffect, useState } from "react";
import { currentJob } from "../../../models/jobPosition";
import { Button, Descriptions, Tag } from "antd";
import Notification from "../../../components/Notification/Notification";
import AvatarAdmin from "../../../components/Header/AvatarAdmin";

const DetailJobPosition = () => {
  const jobPositionId = useParams().id;
  const navigate = useNavigate();
  const { state, getJobDetails } = useJobDetail();
  const [jobPosition, setJobPosition] = useState<currentJob | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchJobPositionDetail = async () => {
      try {
        getJobDetails(jobPositionId);
      } catch (error) {
        console.error("Error fetching JobPosition details:", error);
      }
    };
    fetchJobPositionDetail();
  }, [jobPositionId]);

  useEffect(() => {
    setJobPosition(state?.currentJob);
  }, [state]);

  if (!state.currentJob) {
    return <p className="text-center mt-10">No job position details found.</p>;
  }
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-full ">
          <div>
            <Button
              type="link"
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-all"
            >
              <span className="text-2xl mb-1">←</span> Back
            </Button>
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="p-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-blue-600">Job Position Detail</h3>
            <div
              className={`text-sm px-3 py-1 rounded-md shadow ${
                jobPosition?.jobPositionPermission === "Approve"
                  ? "text-white bg-green-500"
                  : jobPosition?.jobPositionPermission === "Reject"
                  ? "text-white bg-red-500"
                  : "text-white bg-blue-500"
              }`}
            >
              {jobPosition?.jobPositionPermission === "Approve"
                ? "Approved"
                : jobPosition?.jobPositionPermission === "Reject"
                ? "Rejected"
                : "Pending"}
            </div>
          </div>
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item label="Name">
                {jobPosition?.jobPositionName}
              </Descriptions.Item>
              <Descriptions.Item label="Code">
                {jobPosition?.jobPositionCode}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <div
                  className="prose list-disc whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{
                    __html: state.currentJob.jobPositionDescription || "",
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Major">
                {jobPosition?.majorDetails?.length ? (
                  jobPosition?.majorDetails?.map((major, index) => (
                    <Tag
                      key={index}
                      color="blue"
                    >
                      {major.majorCode} - {major.majorName}
                    </Tag>
                  ))
                ) : (
                  <span>No major available</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Certification">
                {jobPosition?.certificationDetails?.length ? (
                  jobPosition?.certificationDetails?.map((cert, index) => (
                    <Tag
                      key={index}
                      color="green"
                    >
                      {cert.certCode} - {cert.certName}
                    </Tag>
                  ))
                ) : (
                  <span>No certifications available</span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailJobPosition;
