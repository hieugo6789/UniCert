import { Descriptions, Modal, Spin } from "antd";
import useOrganizeDetail from "../../hooks/Organization/useOrganizeDetail";
import { useState } from "react";
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";

interface ViewOrganizeDetailProps {
  organizeId: string;
}

const ViewOrganize: React.FC<ViewOrganizeDetailProps> = ({ organizeId }) => {
  const { state, getOrganizeDetails } = useOrganizeDetail();
  const [isView, setIsView] = useState(false);

  const handleView = async (organizeId: string) => {
    setIsView(true);
    await getOrganizeDetails(organizeId);
  };
  return (
    <>
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(organizeId)}
      />
      <Modal
        width={800}
        footer={null}
        open={isView}
        onCancel={() => setIsView(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentOrganize ? (
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "150px", fontWeight: "bold" }} // Cố định độ dài label
              contentStyle={{ width: "300px", textAlign: "left" }}
              title={
                <h3 className="text-2xl text-blue-600">Organization Details</h3>
              }
            >
              <Descriptions.Item label="Name">
                <span className="text-blue-700">
                  {state.currentOrganize.organizeName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Contact">
                <span className="text-gray-600">
                  {state.currentOrganize.organizeContact}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined />{" "}
                <span className="text-gray-600">
                  {state.currentOrganize.organizeAddress}
                </span>
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
export default ViewOrganize;
