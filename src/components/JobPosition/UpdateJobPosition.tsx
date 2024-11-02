import { Form, Input, message, Modal, Select } from "antd";
import useUpdateJob from "../../hooks/JobPosition/useUpdateJob";
import useMajor from "../../hooks/Major/useMajor";
import useCertificate from "../../hooks/Certification/useCertificate";
import useJobDetail from "../../hooks/JobPosition/useJobDetail";
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
  const { updateJobDetails } = useUpdateJob();
  const { major } = useMajor();
  const { certificate } = useCertificate();
  const { state: jobDetailState, getJobDetails } = useJobDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (jobPositionId) {
      getJobDetails(jobPositionId);
    }
  };

  useEffect(() => {
    if (jobDetailState.currentJob) {
      const currentJobPosition = jobDetailState.currentJob;
      const majorIds = Array.isArray(currentJobPosition.majorDetails)
        ? currentJobPosition.majorDetails.map((major) => major.majorId)
        : [];
      const certIds = Array.isArray(currentJobPosition.certificationDetails)
        ? currentJobPosition.certificationDetails.map((cert) => cert.certId)
        : [];
      form.setFieldsValue({
        jobPositionName: currentJobPosition.jobPositionName,
        jobPositionCode: currentJobPosition.jobPositionCode,
        jobPositionDescription: currentJobPosition.jobPositionDescription,
        majorId: majorIds,
        certId: certIds,
      });
    }
  }, [jobDetailState.currentJob, jobPositionId, form]);

  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      const formData = form.getFieldsValue();
      await updateJobDetails(jobPositionId, formData);
      message.success("Certificate updated successfully!");
      refetchJobs();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the certificate.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
        >
          <Form.Item
            label="Name"
            name="jobPositionName"
            rules={[
              { required: true, message: "Please enter the job position name" },
            ]}
          >
            <Input placeholder="Enter Job position name" />
          </Form.Item>
          <Form.Item
            label="Code"
            name="jobPositionCode"
            rules={[
              { required: true, message: "Please enter the Job position code" },
            ]}
          >
            <Input placeholder="Enter Job position code" />
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
              value={form.getFieldValue("jobPositionDescription")}
              onChange={(content) =>
                form.setFieldsValue({ jobPositionDescription: content })
              }
            />
          </Form.Item>
          <Form.Item
            label="Major"
            name="majorId"
          >
            <Select
              placeholder="Select Major"
              // value={formData.majorId}
              // onChange={handleSelectMajorChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {major
                .filter((m) => m.majorPermission === "Approve")
                .map((m) => (
                  <Select.Option
                    key={m.majorId}
                    value={m.majorId}
                  >
                    {m.majorName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Certifications"
            name="certId"
          >
            <Select
              placeholder="Select certifications"
              // value={formData.certId}
              // onChange={handleSelectCertChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {certificate
                .filter((cert) => cert.permission === "Approve")
                .map((cert) => (
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
