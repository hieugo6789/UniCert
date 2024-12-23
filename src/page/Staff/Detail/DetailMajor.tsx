import { useNavigate, useParams } from "react-router-dom";
import useMajorDetail from "../../../hooks/Major/useMajorDetail";
import { useEffect, useState } from "react";
import { currentMajor } from "../../../models/major";
import { Button, Descriptions, Tag } from "antd";
import Notification from "../../../components/Notification/Notification";
import AvatarAdmin from "../../../components/Header/AvatarAdmin";

const DetailMajor = () => {
  const majorId = useParams().id;
  const navigate = useNavigate();
  const { state, getMajorDetails } = useMajorDetail();
  const [major, setMajor] = useState<currentMajor | undefined>(undefined);

  useEffect(() => {
    const fetchMajorDetail = async () => {
      try {
        getMajorDetails(majorId);
      } catch (error) {
        console.error("Error fetching major details:", error);
      }
    };
    fetchMajorDetail();
  }, [majorId]);

  useEffect(() => {
    setMajor(state?.currentMajor);
  }, [state]);
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
                major?.majorPermission === "Approve"
                  ? "text-white bg-green-500"
                  : major?.majorPermission === "Reject"
                  ? "text-white bg-red-500"
                  : "text-white bg-blue-500"
              }`}
            >
              {major?.majorPermission === "Approve"
                ? "Approved"
                : major?.majorPermission === "Reject"
                ? "Rejected"
                : "Pending"}
            </div>
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
export default DetailMajor;
