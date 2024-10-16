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
  const { updateMajorDetails, state } = useUpdateMajor();
  const { job } = useJob();
  const { state: majorDetailState, getMajorDetails } = useMajorDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    majorName: "",
    majorCode: "",
    majorDescription: "",
    jobPositionId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
    if (majorId) {
      getMajorDetails(majorId);
    }
  };

  useEffect(() => {
    if (majorDetailState.currentMajor) {
      const currentMajor = majorDetailState.currentMajor;
      setFormData({
        majorName: currentMajor.majorName,
        majorCode: currentMajor.majorCode,
        majorDescription: currentMajor.majorDescription,
        jobPositionId: currentMajor.jobPositionId || [],
      });
      form.setFieldsValue(currentMajor);
    }
  }, [state.currentMajor, majorId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      console.log(formData);
      await updateMajorDetails(majorId, formData);
      message.success("Major updated successfully!");
      refetchMajors();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the major.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectJobChange = (value: number[]) => {
    setFormData({
      ...formData,
      jobPositionId: Array.isArray(value) ? value : [value],
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            <Input
              name="majorName"
              value={formData.majorName}
              onChange={handleInputChange}
              placeholder="Enter major name"
            />
          </Form.Item>
          <Form.Item
            label="Major Code"
            name="majorCode"
            rules={[
              { required: true, message: "Please input the major code!" },
            ]}
          >
            <Input
              name="majorCode"
              value={formData.majorCode}
              onChange={handleInputChange}
              placeholder="Enter major code"
            />
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
              value={formData.majorDescription}
              onChange={(content) =>
                setFormData({ ...formData, majorDescription: content })
              }
            />
          </Form.Item>
          <Form.Item label="Job Position">
            <Select
              placeholder="Select Job position"
              value={formData.jobPositionId}
              onChange={handleSelectJobChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {job.map((j) => (
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
