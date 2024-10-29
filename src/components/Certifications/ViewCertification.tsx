import { EyeOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
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
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCert ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentCert.certName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentCert.certCode}
            </p>
            <p>
              <strong>Description: </strong>
            </p>
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentCert.certDescription || "",
              }}
            />
            <p>
              <strong>Point system: </strong>{" "}
              {state.currentCert.certPointSystem}
            </p>
            <p>
              <strong>Image: </strong>{" "}
              <img
                src={state.currentCert.certImage}
                alt="Current Image"
                className="w-32 h-32 bg-gray-300 mb-4"
              />
            </p>
            <p>
              <strong>Cost for official exam:</strong>{" "}
              {state.currentCert.certCost} $
            </p>
            <p>
              <strong>Period: </strong> {state.currentCert.certValidity}
            </p>
            <p>
              <strong>Prerequisite certifications: </strong>{" "}
              {state.currentCert.certPrerequisite} -{" "}
              {state.currentCert.certCodePrerequisite}
            </p>
            <p>
              <strong>Organization: </strong> {state.currentCert.organizeName}
            </p>
            <p>
              <strong>Level: </strong> {state.currentCert.typeName}
            </p>
            <p>
              <strong>Major:</strong> {state.currentCert.majorNames}
            </p>
            <p>
              <strong>Job position:</strong>{" "}
              {state.currentCert.jobPositionNames}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default ViewCertification;
