import { Form, Input, message, Modal, Select } from "antd";
import useUpdateJob from "../../hooks/JobPosition/useUpdateJob";
import useMajor from "../../hooks/Major/useMajor";
import useJobDetail from "../../hooks/JobPosition/useJobDetail";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import MyEditor from "../Editor/MyEditor";
import useAllCertification from "../../hooks/Certification/useAllCertification";

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
  const { certificate } = useAllCertification();
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
export default UpdateJobPosition;
