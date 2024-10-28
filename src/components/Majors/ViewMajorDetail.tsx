import { EyeOutlined } from "@ant-design/icons";
import useMajorDetail from "../../hooks/Major/useMajorDetail";
import { useState } from "react";
import { Modal, Spin, Tag } from "antd";

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
        title="Major Details"
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentMajor ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentMajor.majorName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentMajor.majorCode}
            </p>
            <strong>Description: </strong>
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentMajor.majorDescription || "",
              }}
            />
            <p>
              <strong>Job position: </strong>
              {state.currentMajor.jobPositionDetails?.map((job, index) => (
                <Tag key={index}>
                  {job.jobPositionCode} - {job.jobPositionName}
                </Tag>
              )) || "No job positions available"}
            </p>
            <p>
              <strong>Certification: </strong>
              {state.currentMajor.certificationDetails?.map((cert, index) => (
                <Tag key={index}>
                  {cert.certCode} - {cert.certName}
                </Tag>
              )) || "No job positions available"}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default ViewMajorDetail;
