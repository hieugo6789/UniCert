import { Modal, Spin, Tag } from "antd";
import useJobDetail from "../../hooks/JobPosition/useJobDetail";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";

interface ViewJobDetailProps {
  jobPositionId: string;
}

const ViewJobPosition: React.FC<ViewJobDetailProps> = ({ jobPositionId }) => {
  const { state, getJobDetails } = useJobDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (jobPositionId: string) => {
    setIsModalVisible(true);
    await getJobDetails(jobPositionId);
  };
  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(jobPositionId)}
      />
      <Modal
        width={900}
        title="Certification Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentJob ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentJob.jobPositionName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentJob.jobPositionCode}
            </p>
            <strong>Description: </strong>{" "}
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentJob.jobPositionDescription || "",
              }}
            />
            <p>
              <strong>Major: </strong>{" "}
              {state.currentJob.majorDetails?.map((major, index) => (
                <Tag key={index}>
                  {major.majorCode} - {major.majorName}
                </Tag>
              )) || "No major available"}
            </p>
            <p>
              <strong>Certification: </strong>
              {state.currentJob.certificationDetails?.map((cert, index) => (
                <Tag key={index}>
                  {cert.certCode} -{cert.certName}
                </Tag>
              ))}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default ViewJobPosition;
