import { Form, Input, message, Modal, Select } from "antd";
import useUpdateJob from "../../hooks/useUpdateJob";
import useMajor from "../../hooks/useMajor";
import useCertificate from "../../hooks/useCertificate";
import useJobDetail from "../../hooks/useJobDetail";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import MyEditor from "../Editor/MyEditor";

interface UpdateJobProps {
  jobPositionId: string;
  refetchJobs: () => void;
}

const UpdateJobPosition: React.FC<UpdateJobProps> = ({
  jobPositionId,
  refetchJobs,
}) => {
  const [form] = Form.useForm();
  const { updateJobDetails, state } = useUpdateJob();
  const { major } = useMajor();
  const { certificate } = useCertificate();
  const { state: jobDetailState, getJobDetails } = useJobDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    jobPositionName: "",
    jobPositionCode: "",
    jobPositionDescription: "",
    majorId: [] as number[],
    certId: [] as number[],
  });
  useEffect(() => {
    if (jobDetailState.currentJob) {
      const currentJobPosition = jobDetailState.currentJob;
      console.log("Current job position data:", currentJobPosition);
      setFormData({
        jobPositionName: currentJobPosition.jobPositionName,
        jobPositionCode: currentJobPosition.jobPositionCode,
        jobPositionDescription: currentJobPosition.jobPositionDescription,
        majorId: currentJobPosition.majorId || [],
        certId: currentJobPosition.certId || [],
      });
      form.setFieldsValue(currentJobPosition);
    }
  }, [state.currentJob, jobPositionId, form]);

  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      console.log(formData);
      await updateJobDetails(jobPositionId, formData);
      message.success("Certificate updated successfully!");
      refetchJobs();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the certificate.");
    }
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
  const showModal = () => {
    setIsModalVisible(true);
    if (jobPositionId) {
      getJobDetails(jobPositionId);
    }
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
        title="Update Job position"
        open={isModalVisible} // Use modal visibility state
        onOk={handleUpdate}
        onCancel={handleCancel} // Handle cancel button
        okText="Update"
        cancelText="Cancel"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
        >
          <Form.Item
            label="Name"
            name="jobPositionName"
            rules={[
              { required: true, message: "Please enter the job position name" },
            ]}
          >
            <Input
              name="jobPositionName"
              value={formData.jobPositionName}
              onChange={handleInputChange}
              placeholder="Enter Job position name"
            />
          </Form.Item>
          <Form.Item
            label="Code"
            name="jobPositionCode"
            rules={[
              { required: true, message: "Please enter the Job position name" },
            ]}
          >
            <Input
              name="jobPositionCode"
              value={formData.jobPositionCode}
              onChange={handleInputChange}
              placeholder="Enter Job position name"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="jobPositionDescription"
            rules={[
              {
                required: true,
                message: "Please enter the Job position description",
              },
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
              value={formData.majorId}
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
          <Form.Item label="Certifications">
            <Select
              placeholder="Select certifications"
              value={formData.certId}
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
export default UpdateJobPosition;
