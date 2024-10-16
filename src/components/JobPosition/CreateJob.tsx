import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateJob } from "../../hooks/useCreateJob";
import useCertificate from "../../hooks/useCertificate";
import useMajor from "../../hooks/useMajor";
import axios from "axios";
import MyEditor from "../Editor/MyEditor";

const CreateJob = ({
  refetchJobPositions,
}: {
  refetchJobPositions: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateJob } = useCreateJob();
  const { certificate } = useCertificate();
  const { major } = useMajor();

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    jobPositionName: "",
    jobPositionCode: "",
    jobPositionDescription: "",
    majorId: [] as number[],
    certId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOK = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();

      await handleCreateJob(formData);
      setIsModalVisible(false);
      refetchJobPositions();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating job position:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("An unexpected error occurred:", error);
      } else {
        console.error("Validation failed.");
      }
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectMajorChange = (value: number[]) => {
    setFormData({
      ...formData,
      majorId: Array.isArray(value) ? value : [value],
    });
  };
  const handleSelectCertChange = (value: number[]) => {
    setFormData({
      ...formData,
      certId: Array.isArray(value) ? value : [value],
    });
  };
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
        style={{ maxWidth: "120px" }}
      >
        Job position
      </Button>
      <Modal
        title="Create New Job Position"
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
        >
          <Form.Item
            label="Job position Name"
            name="jobPositionName"
            rules={[
              {
                required: true,
                message: "Please input the job position name!",
              },
            ]}
          >
            <Input
              name="jobPositionName"
              value={formData.jobPositionName}
              onChange={handleInputChange}
              placeholder="Enter job name"
            />
          </Form.Item>
          <Form.Item
            label="Job position Code"
            name="jobPositionCode"
            rules={[
              {
                required: true,
                message: "Please input the job position code!",
              },
            ]}
          >
            <Input
              name="jobPositionCode"
              value={formData.jobPositionCode}
              onChange={handleInputChange}
              placeholder="Enter job code"
            />
          </Form.Item>

          <Form.Item
            label="Job position Description"
            name="jobDescription"
            rules={[
              { required: true, message: "Please input the job description!" },
            ]}
          >
            <MyEditor
              value={formData.jobPositionDescription}
              onChange={(content) =>
                setFormData({ ...formData, jobPositionDescription: content })
              }
            />
          </Form.Item>
          <Form.Item label="Major">
            <Select
              placeholder="Select Major"
              onChange={handleSelectMajorChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {major.map((m) => (
                <Select.Option
                  key={m.majorId}
                  value={m.majorId}
                >
                  {m.majorName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Certification">
            <Select
              placeholder="Select Certification"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {certificate.map((cert) => (
                <Select.Option
                  key={cert.certId}
                  value={cert.certId}
                >
                  {cert.certName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateJob;
