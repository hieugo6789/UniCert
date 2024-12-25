import { Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import useUpdateSchedule from "../../hooks/Schedule/useUpdateSchedule";
import useScheduleDetail from "../../hooks/Schedule/useScheduleDetail";
import useAllCertification from "../../hooks/Certification/useAllCertification";

interface UpdateScheduleProps {
  sessionId: number;
  refetchSchedules: () => void;
}

const UpdateSchedule: React.FC<UpdateScheduleProps> = ({ sessionId, refetchSchedules }) => {
  const [form] = Form.useForm();
  const { updateSchedule } = useUpdateSchedule();
  const { state: scheduleDetailState, getScheduleDetails } = useScheduleDetail();
  const { certificate } = useAllCertification();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (sessionId) {
      getScheduleDetails(sessionId);
    }
  };

  useEffect(() => {
    if (scheduleDetailState.currentSchedule) {
      const currentSchedule = scheduleDetailState.currentSchedule;
      const vietnamTime = new Date(currentSchedule.sessionDate);

      form.setFieldsValue({
        sessionName: currentSchedule.sessionName,
        sessionCode: currentSchedule.sessionCode,
        sessionDate: vietnamTime.toISOString().substring(0, 16), // Format as 'YYYY-MM-DDTHH:MM'
        sessionAddress: currentSchedule.sessionAddress,
        sessionTime: currentSchedule.sessionTime,
        certId: currentSchedule.certId,
      });
    }
  }, [scheduleDetailState.currentSchedule, sessionId, form]);

  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      const formData = form.getFieldsValue();
      await updateSchedule(sessionId, formData); // Submit the form data as is
      message.success("Schedule updated successfully!");
      refetchSchedules();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the schedule.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when closing the modal
  };

  return (
    <>
      <div onClick={showModal}>Update</div>
      <Modal
        title="Update Schedule"
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
            label="Name"
            name="sessionName"
            rules={[{ required: true, message: "Please input the schedule name!" }]}
          >
            <Input placeholder="Enter schedule name" />
          </Form.Item>
          <Form.Item
            label="Code"
            name="sessionCode"
            rules={[{ required: true, message: "Please input the schedule code!" }]}
          >
            <Input placeholder="Enter schedule code" />
          </Form.Item>
          <Form.Item
            label="Date and Time"
            name="sessionDate"
            rules={[{ required: true, message: "Please select the schedule date and time!" }]}
          >
            <Input
              type="datetime-local"
              placeholder="Enter schedule date"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="sessionAddress"
            rules={[{ required: true, message: "Please input the schedule address!" }]}
          >
            <Input placeholder="Enter schedule address" />
          </Form.Item>
          <Form.Item
            label="Time"
            name="sessionTime"
            rules={[{ required: true, message: "Please input the time for exam!" }]}
          >
            <Input placeholder="Enter time for exam" />
          </Form.Item>
          <Form.Item
            label="Certification"
            name="certId"
            rules={[{ required: true, message: "Please select a certification!" }]}
          >
            <Select placeholder="Select Certification" style={{ width: "100%" }}>
              {certificate.map((cert) => (
                <Select.Option key={cert.certId} value={cert.certId}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{cert.certName}</span>
                    <span style={{
                      color: cert.permission === "Approve"
                        ? "green"
                        : cert.permission === "Reject"
                        ? "red"
                        : "blue",
                    }}>
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

export default UpdateSchedule;
