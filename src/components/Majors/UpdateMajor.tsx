import { Form, Input, message, Modal, Select } from "antd";
import useUpdateMajor from "../../hooks/useUpdateMajor";
import { useEffect, useState } from "react";
import useJob from "../../hooks/useJobPosition";
import useMajorDetail from "../../hooks/useMajorDetail";
import { EditOutlined } from "@ant-design/icons";
import MyEditor from "../Editor/MyEditor";

interface UpdateMajorProps {
  majorId: string;
  refetchMajors: () => void;
}

const UpdateMajor: React.FC<UpdateMajorProps> = ({
  majorId,
  refetchMajors,
}) => {
  const [form] = Form.useForm();
  const { updateMajorDetails } = useUpdateMajor();
  const { job } = useJob();
  const { state: majorDetailState, getMajorDetails } = useMajorDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (majorId) {
      getMajorDetails(majorId);
    }
  };

  useEffect(() => {
    if (majorDetailState.currentMajor) {
      const currentMajor = majorDetailState.currentMajor;
      const jobPositionIds = Array.isArray(currentMajor.jobPositionDetails)
        ? currentMajor.jobPositionDetails.map((job) => job.jobPositionId)
        : []; // Ensure it's an array

      // Update form fields directly
      form.setFieldsValue({
        majorName: currentMajor.majorName || "",
        majorCode: currentMajor.majorCode || "",
        majorDescription: currentMajor.majorDescription || "",
        jobPositionId: jobPositionIds,
      });
    }
  }, [majorDetailState.currentMajor, majorId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue(); // Get form data from form state
      await updateMajorDetails(majorId, formData);
      message.success("Major updated successfully!");
      refetchMajors();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the major.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when closing the modal
  };

  return (
    <>
      <EditOutlined
        onClick={showModal}
        style={{ marginLeft: 12 }}
      />
      <Modal
        title="Update Major"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Major Name"
            name="majorName"
            rules={[
              { required: true, message: "Please input the major name!" },
            ]}
          >
            <Input placeholder="Enter major name" />
          </Form.Item>
          <Form.Item
            label="Major Code"
            name="majorCode"
            rules={[
              { required: true, message: "Please input the major code!" },
            ]}
          >
            <Input placeholder="Enter major code" />
          </Form.Item>

          <Form.Item
            label="Major Description"
            name="majorDescription"
            rules={[
              {
                required: true,
                message: "Please input the major description!",
              },
            ]}
          >
            <MyEditor
              value={form.getFieldValue("majorDescription")} // Sync editor value with form
              onChange={(content) =>
                form.setFieldsValue({ majorDescription: content })
              }
            />
          </Form.Item>
          <Form.Item
            label="Job Position"
            name="jobPositionId"
          >
            <Select
              placeholder="Select Job position"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {job.length > 0 &&
                job.map((j) => (
                  <Select.Option
                    key={j.jobPositionId}
                    value={j.jobPositionId}
                  >
                    {j.jobPositionName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateMajor;
