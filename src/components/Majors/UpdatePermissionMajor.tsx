import { message, Select, Modal, Button } from "antd";
import usePermissionMajor from "../../hooks/Major/usePermissionMajor";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

interface UpdatePermissionMajorProps {
  majorId: number;
  refetchMajors: () => void;
}

const UpdatePermissionMajor: React.FC<UpdatePermissionMajorProps> = ({
  majorId,
  refetchMajors,
}) => {
  const { updatePermissionMajorDetails } = usePermissionMajor();
  const [selectedStatus, setSelectedStatus] = useState<number>(1); // Default to 1 (approve)
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const handleUpdate = async () => {
    try {
      await updatePermissionMajorDetails(majorId, selectedStatus);
      message.success("Updated successfully!");
      refetchMajors();
      setIsModalVisible(false); // Close the modal after update
    } catch (error) {
      message.error("Failed to update.");
    }
  };

  return (
    <>
      <EditOutlined
        onClick={() => setIsModalVisible(true)}
        className="ml-3"
      />
      <Modal
        title="Update Major Status"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // No default footer
      >
        <div className="flex flex-col space-y-4">
          <Select
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            style={{ width: "100%" }}
            className="border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
          >
            <Option value={0}>Pending</Option>
            <Option value={1}>Approve</Option>
            <Option value={2}>Reject</Option>
          </Select>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleUpdate}
            >
              Confirm Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePermissionMajor;
