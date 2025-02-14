import { useState } from "react";
import { useCreateSchedule } from "../../hooks/Schedule/useCreateSchedule";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import useAllCertification from "../../hooks/Certification/useAllCertification";

const CreateSchedule = ({
  refetchSchedules,
}: {
  refetchSchedules: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateSchedule } = useCreateSchedule();
  const { certificate } = useAllCertification();

  const [form] = Form.useForm();
  const currentDate = new Date();

  // Helper function to convert UTC to Vietnam Time (UTC+7)
  const convertToVietnamTime = (date: Date) => {
    const vietnamOffset = 7 * 60; // UTC+7 in minutes
    const localTime = date.getTime() + vietnamOffset * 60 * 1000;
    return new Date(localTime);
  };

  const [formData, setFormData] = useState({
    sessionName: "",
    sessionCode: "",
    sessionAddress: "",
    sessionDate: convertToVietnamTime(currentDate), // Convert current date to Vietnam Time
    certId: 0,
    sessionTime: "",
    sessionCreatedAt: currentDate,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOK = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      await handleCreateSchedule(formData);
      form.resetFields();
      setFormData({
        sessionName: "",
        sessionCode: "",
        sessionAddress: "",
        sessionDate: new Date(), // Convert to Vietnam Time again
        certId: 0,
        sessionTime: "",
        sessionCreatedAt: currentDate,
      });
      setIsModalVisible(false);
      refetchSchedules();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating course:", error.response?.data);
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
  const handleSelectCertChange = (value: number) => {
    setFormData({
      ...formData,
      certId: value,
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
        Schedule
      </Button>
      <Modal
        title="Create New Schedule"
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
            sessionDate: formData.sessionDate.toISOString().substring(0, 16),
          }}
        >
          <Form.Item
            label="Name"
            name="sessionName"
            rules={[{ required: true, message: "Please input the schedule name!" }]}
          >
            <Input
              name="sessionName"
              value={formData.sessionName}
              onChange={handleInputChange}
              placeholder="Enter schedule name"
            />
          </Form.Item>
          <Form.Item
            label="Code"
            name="sessionCode"
            rules={[{ required: true, message: "Please input the schedule code!" }]}
          >
            <Input
              name="sessionCode"
              value={formData.sessionCode}
              onChange={handleInputChange}
              placeholder="Enter schedule code"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="sessionAddress"
            rules={[{ required: true, message: "Please input the schedule address!" }]}
          >
            <Input
              name="sessionAddress"
              value={formData.sessionAddress}
              onChange={handleInputChange}
              placeholder="Enter schedule address"
            />
          </Form.Item>
          <Form.Item
            label="Date and Time"
            name="sessionDate"
            rules={[{ required: true, message: "Please select the schedule date and time!" }]}
          >
            <Input
              type="datetime-local"
              value={
                formData.sessionDate
                  ? formData.sessionDate.toISOString().substring(0, 16)
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sessionDate: convertToVietnamTime(new Date(e.target.value)),
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Time"
            name="sessionTime"
            rules={[{ required: true, message: "Please input the time for exam!" }]}
          >
            <Input
              name="sessionTime"
              value={formData.sessionTime}
              onChange={handleInputChange}
              placeholder="Enter time for exam"
            />
          </Form.Item>
          <Form.Item
            label="Certification"
            name="certId"
            rules={[{ required: true, message: "Please input the certification!" }]}
          >
            <Select
              placeholder="Select Certification"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
            >
              {certificate.map((cert) => (
                <Select.Option key={cert.certId} value={cert.certId}>
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
export default CreateSchedule;
