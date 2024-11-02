import { Descriptions, Modal, Spin, Tag } from "antd";
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
  const approvedMajor = state.currentJob.majorDetails?.filter(
    (ma) => ma.majorPermission === "Approve"
  );
  const approvedCertification = state.currentJob.certificationDetails?.filter(
    (cert) => cert.permission === "Approve"
  );
  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(jobPositionId)}
      />
      <Modal
        width={900} // Same width as ViewOrganize
        footer={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentJob ? (
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "50px", fontWeight: "bold" }}
              contentStyle={{ width: "600px", textAlign: "left" }}
              title={
                <h3 className="text-2xl text-blue-600">Job Position Details</h3>
              }
            >
              <Descriptions.Item label="Name">
                <span className="text-blue-700">
                  {state.currentJob.jobPositionName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Code">
                <span className="text-gray-600">
                  {state.currentJob.jobPositionCode}
                </span>
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
                {approvedMajor?.length ? (
                  approvedMajor.map((major, index) => (
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
                {approvedCertification?.length ? (
                  approvedCertification.map((cert, index) => (
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
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default ViewJobPosition;
