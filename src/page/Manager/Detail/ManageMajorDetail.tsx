import { useNavigate, useParams } from "react-router-dom";
import usePermissionMajor from "../../../hooks/Major/usePermissionMajor";
import useMajorDetail from "../../../hooks/Major/useMajorDetail";
import { useEffect, useState } from "react";
import { currentMajor } from "../../../models/major";
import { Button, Descriptions, Tag } from "antd";
import DetailPermission from "../../../components/Permission/DetailPermission";

const ManageMajorDetail = () => {
  const majorId = useParams().id;
  const navigate = useNavigate();
  const { state, getMajorDetails } = useMajorDetail();
  const [major, setMajor] = useState<currentMajor | undefined>(undefined);
  const { updatePermissionMajorDetails } = usePermissionMajor();
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
    const fetchMajorDetail = async () => {
      try {
        getMajorDetails(majorId);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };
    fetchMajorDetail();
  }, [majorId]);

  useEffect(() => {
    if (state?.currentMajor) {
      setMajor(state.currentMajor);
    }
  }, [state.currentMajor]);

  if (!state.currentMajor) {
    return <p className="text-center mt-10">No major details found.</p>;
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
            <h3 className="text-2xl text-blue-600">Major Details</h3>
            <DetailPermission
              Id={Number(majorId)}
              updateFunction={updatePermissionMajorDetails}
              initialStatus={mapStatusToNumber(
                state.currentMajor?.majorPermission || "Pending"
              )}
              onUpdateSuccess={() => getMajorDetails(majorId)}
            />
          </div>
          <Descriptions
            bordered
            size="middle"
            column={2}
            className="mb-4"
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Name">
              <span className="text-blue-700">
                {state.currentMajor.majorName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              <span className="text-gray-600">
                {state.currentMajor.majorCode}
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label="Description"
              span={2}
            >
              <div
                className="prose list-disc whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: state.currentMajor.majorDescription || "",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label="Image"
              span={2}
            >
              <img
                src={state.currentMajor.majorImage}
                alt="Major Image"
                className="w-32 h-32 bg-gray-300 mb-4"
              />
            </Descriptions.Item>
            <Descriptions.Item
              label="Job Positions"
              span={2}
            >
              {major?.jobPositionDetails?.length ? (
                major?.jobPositionDetails?.map((job, index) => (
                  <Tag
                    key={index}
                    color="blue"
                  >
                    {job.jobPositionCode} - {job.jobPositionName}
                  </Tag>
                ))
              ) : (
                <span>No job positions available</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Certifications"
              span={2}
            >
              {major?.certificationDetails?.length ? (
                major?.certificationDetails?.map((cert, index) => (
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
export default ManageMajorDetail;
