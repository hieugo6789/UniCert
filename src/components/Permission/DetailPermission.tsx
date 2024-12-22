import { message, Select } from "antd";
import { useState } from "react";
const { Option } = Select;

interface UpdateDetailPermissionProps {
  Id: number;
  initialStatus: number;
  updateFunction: (Id: number, status: number) => Promise<void>;
}

const DetailPermission: React.FC<UpdateDetailPermissionProps> = ({
  Id,
  updateFunction,
  initialStatus
}) => {
  const [selectedStatus, setSelectedStatus] = useState<number>(initialStatus);

  const handleChange = async (value: number) => {
    setSelectedStatus(value); 
    try {
      await updateFunction(Id, value); 
      message.success("Updated successfully!");
    } catch (error) {
      message.error("Failed to update.");
    }
  };

  return (
    <div className="min-w-24">
      <Select
        value={selectedStatus}
        onChange={handleChange}
        style={{ width: "100%" }}
        className="border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
      >
        <Option value={0}>Pending</Option>
        <Option value={1}>Approve</Option>
        <Option value={2}>Reject</Option>
      </Select>
    </div>
  );
};

export default DetailPermission;
