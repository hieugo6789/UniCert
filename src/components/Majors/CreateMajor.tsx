import { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd"; // Import Ant Design components
import { PlusOutlined } from "@ant-design/icons";
import { useCreateMajor } from "../../hooks/Major/useCreateMajor";
import useJob from "../../hooks/JobPosition/useJobPosition";
import axios from "axios";
import MyEditor from "../Editor/MyEditor";
import useCertificate from "../../hooks/Certification/useCertificate";

const CreateMajor = ({ refetchMajors }: { refetchMajors: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateMajor } = useCreateMajor();
  const { job } = useJob();
  const { certificate } = useCertificate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    majorName: "",
    majorCode: "",
    majorDescription: "",
    majorImage: "",
    jobPositionId: [] as number[],
    certId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();

      await handleCreateMajor(formData);
      setIsModalVisible(false);
      refetchMajors();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating major:", error.response?.data);
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
  const handleSelectJobChange = (value: number[]) => {
    setFormData({
      ...formData,
      jobPositionId: Array.isArray(value) ? value : [value],
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
        style={{ maxWidth: "80px" }}
      >
        Major
      </Button>

      <Modal
        width={900}
        title="Create New Major"
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
          <Form.Item
            label="Major Image"
            name="majorImage"
            rules={[
              { required: true, message: "Please input the major image!" },
            ]}
          >
            <Input
              name="majorImage"
              value={formData.majorImage}
              onChange={handleInputChange}
              placeholder="Enter major image"
            />
          </Form.Item>
          <Form.Item label="Job Position">
            <Select
              placeholder="Select Job position"
              onChange={handleSelectJobChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {job.map((j) => (
                <Select.Option
                  key={j.jobPositionId}
                  value={j.jobPositionId}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {j.jobPositionName}
                    <span
                      style={{
                        color:
                          j.jobPositionPermission === "Approve"
                            ? "green"
                            : j.jobPositionPermission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {j.jobPositionPermission}
                    </span>
                  </div>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{cert.certName}</span>
                    <span
                      style={{
                        color:
                          cert.permission === "Approve"
                            ? "green"
                            : cert.permission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {cert.permission}
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMajor;
