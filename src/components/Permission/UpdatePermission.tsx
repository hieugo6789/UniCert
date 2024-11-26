import { message, Select, Modal, Button } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

interface UpdatePermissionProps {
  Id: number;
  refetch: (
    searchTerm?: string,
    pageNumber?: number,
    pageSize?: number
  ) => void;
  updateFunction: (Id: number, status: number) => Promise<void>;
  searchTerm?: string; // Tìm kiếm
  currentPage?: number; // Trang hiện tại (tuỳ chọn)
  pageSize?: number; // Số mục trên mỗi trang (tuỳ chọn)
}

const UpdatePermission: React.FC<UpdatePermissionProps> = ({
  Id,
  refetch,
  updateFunction,
  searchTerm,
  currentPage,
  pageSize,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<number>(1); // Giá trị trạng thái
  const [isModalVisible, setIsModalVisible] = useState(false); // Kiểm soát hiển thị modal

  // Xử lý cập nhật trạng thái
  const handleUpdate = async () => {
    try {
      await updateFunction(Id, selectedStatus);
      message.success("Updated successfully!");

      if (searchTerm && currentPage && pageSize) {
        refetch(searchTerm, currentPage, pageSize);
      } else if (searchTerm) {
        refetch(searchTerm);
      } else if (currentPage && pageSize) {
        refetch("", currentPage, pageSize);
      } else {
        refetch();
      }

      setIsModalVisible(false); // Đóng modal sau khi cập nhật
    } catch (error) {
      message.error("Failed to update.");
    }
  };

  return (
    <>
      <EditOutlined
        onClick={() => setIsModalVisible(true)} // Hiển thị modal khi click
        className="ml-3"
      />
      <Modal
        title="Update Status"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-col space-y-4">
          {/* Dropdown chọn trạng thái */}
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
          {/* Các nút hành động */}
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

export default UpdatePermission;
