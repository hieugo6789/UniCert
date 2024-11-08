import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateJob } from "../../hooks/JobPosition/useCreateJob";
import useCertificate from "../../hooks/Certification/useCertificate";
import useMajor from "../../hooks/Major/useMajor";
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
      form.resetFields();
      setFormData({
        jobPositionName: "",
        jobPositionCode: "",
        jobPositionDescription: "",
        majorId: [],
        certId: [],
      });
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
        width={900}
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            majorId: [],
            certId: [],
          }}
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
              value={formData.majorId}
            >
              {major.map((m) => (
                <Select.Option
                  key={m.majorId}
                  value={m.majorId}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{m.majorName}</span>
                    <span
                      style={{
                        color:
                          m.majorPermission === "Approve"
                            ? "green"
                            : m.majorPermission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {m.majorPermission}
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
              value={formData.certId}
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
export default CreateJob;
