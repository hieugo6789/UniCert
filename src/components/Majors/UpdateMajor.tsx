import { Form, Input, message, Modal, Select } from "antd";
import useUpdateMajor from "../../hooks/Major/useUpdateMajor";
import { useEffect, useState } from "react";
import useJob from "../../hooks/JobPosition/useJobPosition";
import useMajorDetail from "../../hooks/Major/useMajorDetail";
import { EditOutlined } from "@ant-design/icons";
import MyEditor from "../Editor/MyEditor";
import useCertificate from "../../hooks/Certification/useCertificate";

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
  const { certificate } = useCertificate();
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
        : [];
      const certIds = Array.isArray(currentMajor.certificationDetails)
        ? currentMajor.certificationDetails.map((cert) => cert.certId)
        : [];

      // Update form fields directly
      form.setFieldsValue({
        majorName: currentMajor.majorName || "",
        majorCode: currentMajor.majorCode || "",
        majorDescription: currentMajor.majorDescription || "",
        jobPositionId: jobPositionIds,
        certId: certIds,
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
                job
                  .filter((j) => j.jobPositionPermission === "Approve")
                  .map((j) => (
                    <Select.Option
                      key={j.jobPositionId}
                      value={j.jobPositionId}
                    >
                      {j.jobPositionName}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Certification"
            name="certId"
          >
            <Select
              placeholder="Select Job position"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {certificate.length > 0 &&
                certificate
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

export default UpdateMajor;
