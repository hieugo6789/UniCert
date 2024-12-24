import { useNavigate, useParams } from "react-router-dom";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import { useEffect, useState } from "react";
import { currentJob } from "../../../models/jobPosition";
import { Button, Descriptions, Tag } from "antd";
import usePermissionJob from "../../../hooks/JobPosition/usePermissionJob";
import DetailPermission from "../../../components/Permission/DetailPermission";

const ManageJobDetail = () => {
  const jobPositionId = useParams().id;
  const { updatePermissionJobDetails } = usePermissionJob();
  const navigate = useNavigate();
  const { state, getJobDetails } = useJobDetail();
  const [jobPosition, setJobPosition] = useState<currentJob | undefined>(
    undefined
  );
  const mapStatusToNumber = (status: string): number => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approve":
        return 1;
      case "Reject":
        return 2;
      default:
        return 0;
    }
  };
  useEffect(() => {
    const fetchJobPositionDetail = async () => {
      try {
        getJobDetails(jobPositionId);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchJobPositionDetail();
  }, [jobPositionId]);

  useEffect(() => {
    if (state?.currentJob) {
      setJobPosition(state.currentJob);
    }
  }, [state.currentJob]);

  if (!state.currentJob) {
    return <p className="text-center mt-10">No job details found.</p>;
  }
  return (
    <>
      <div className="relative">
        <Button
          type="link"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-all absolute bottom-4"
        >
          <span className="text-2xl mb-1">←</span> Back
        </Button>
      </div>
      <div className="p-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-blue-600">Job Details</h3>
            <DetailPermission
              Id={Number(jobPositionId)}
              updateFunction={updatePermissionJobDetails}
              initialStatus={mapStatusToNumber(
                state.currentJob?.jobPositionPermission || "Pending"
              )}
              onUpdateSuccess={() => getJobDetails(jobPositionId)}
            />
          </div>
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
    </>
  );
};
export default ManageJobDetail;
