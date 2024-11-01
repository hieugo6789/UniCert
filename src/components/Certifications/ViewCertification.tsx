import { EyeOutlined } from "@ant-design/icons";
import { Modal, Spin, Descriptions, Tag } from "antd";
import useCertDetail from "../../hooks/Certification/useCertDetail";
import { useState } from "react";

interface ViewCertDetailProps {
  certId: number;
}

const ViewCertification: React.FC<ViewCertDetailProps> = ({ certId }) => {
  const { state, getCertDetails } = useCertDetail();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (certId: number) => {
    setIsModalVisible(true);
    await getCertDetails(certId);
  };

  return (
    <>
      <EyeOutlined
        onClick={() => handleView(certId)}
        style={{ color: "blue" }}
      />
      <Modal
        width={900} // Adjusted for consistency
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCert ? (
          <Descriptions
            bordered
            size="middle"
            column={1}
            className="mb-4"
            labelStyle={{ width: "100px", fontWeight: "bold" }}
            contentStyle={{ width: "600px", textAlign: "left" }}
            title={
              <h3 className="text-2xl text-blue-600">Certification Details</h3>
            }
          >
            <Descriptions.Item label="Name">
              <span className="text-blue-700">
                {state.currentCert.certName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              <span className="text-gray-600">
                {state.currentCert.certCode}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              <div
                className="prose list-disc whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: state.currentCert.certDescription || "",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Point System">
              {state.currentCert.certPointSystem}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <img
                src={state.currentCert.certImage}
                alt="Certification"
                className="w-32 h-32 bg-gray-300 mb-4"
              />
            </Descriptions.Item>
            <Descriptions.Item label="Cost for Official Exam">
              {state.currentCert.certCost} $
            </Descriptions.Item>
            <Descriptions.Item label="Validity Period">
              {state.currentCert.certValidity}
            </Descriptions.Item>
            <Descriptions.Item label="Prerequisite Certifications">
              {state.currentCert.certPrerequisite?.length
                ? state.currentCert.certPrerequisite.map(
                    (prerequisite, index) => (
                      <Tag
                        color="blue"
                        key={index}
                      >
                        {prerequisite}
                      </Tag>
                    )
                  )
                : "No Prerequisite Certifications"}
            </Descriptions.Item>
            <Descriptions.Item label="Organization">
              {state.currentCert.organizeName}
            </Descriptions.Item>
            <Descriptions.Item label="Level">
              {state.currentCert.typeName}
            </Descriptions.Item>
            <Descriptions.Item label="Major">
              {state.currentCert.majorNames?.length
                ? state.currentCert.majorNames.map((major, index) => (
                    <Tag
                      color="green"
                      key={index}
                    >
                      {major}
                    </Tag>
                  ))
                : "None"}
            </Descriptions.Item>
            <Descriptions.Item label="Job Positions">
              {state.currentCert.jobPositionNames?.length
                ? state.currentCert.jobPositionNames.map((job, index) => (
                    <Tag
                      color="purple"
                      key={index}
                    >
                      {job}
                    </Tag>
                  ))
                : "None"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default ViewCertification;
