import { EyeOutlined } from "@ant-design/icons";
import useMajorDetail from "../../hooks/Major/useMajorDetail";
import { useState } from "react";
import { Descriptions, Modal, Spin, Tag } from "antd";

interface ViewMajorDetailProps {
  majorId: string;
}

const ViewMajorDetail: React.FC<ViewMajorDetailProps> = ({ majorId }) => {
  const { state, getMajorDetails } = useMajorDetail();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (majorId: string) => {
    setIsModalVisible(true);
    await getMajorDetails(majorId);
  };

  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(majorId)}
      />
      <Modal
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentMajor ? (
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "50px", fontWeight: "bold" }}
              contentStyle={{ width: "600px", textAlign: "left" }}
              title={<h3 className="text-2xl text-blue-600">Major Details</h3>}
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
              <Descriptions.Item label="Description">
                <div
                  className="prose list-disc whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{
                    __html: state.currentMajor.majorDescription || "",
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Job Positions">
                {state.currentMajor.jobPositionDetails?.length ? (
                  state.currentMajor.jobPositionDetails.map((job, index) => (
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
              <Descriptions.Item label="Certifications">
                {state.currentMajor.certificationDetails?.length ? (
                  state.currentMajor.certificationDetails.map((cert, index) => (
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

export default ViewMajorDetail;
