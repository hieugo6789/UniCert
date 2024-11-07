import { Form, Input, message, Modal } from "antd";
import useUpdateSchedule from "../../hooks/Schedule/useUpdateSchedule";
import { useEffect, useState } from "react";
import useScheduleDetail from "../../hooks/Schedule/useScheduleDetail";

interface UpdateScheduleProps {
  sessionId: number;
  refetchSchedules: () => void;
}
const UpdateSchedule: React.FC<UpdateScheduleProps> = ({
  sessionId,
  refetchSchedules,
}) => {
  const [form] = Form.useForm();
  const { updateSchedule } = useUpdateSchedule();
  const { state: scheduleDetailState, getScheduleDetails } =
    useScheduleDetail();

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
      vietnamTime.setHours(vietnamTime.getHours() + 14);
      form.setFieldsValue({
        sessionName: currentSchedule.sessionName,
        sessionCode: currentSchedule.sessionCode,
        sessionDate: currentSchedule.sessionDate
          ? vietnamTime.toISOString().substring(0, 16)
          : "",
        sessionAddress: currentSchedule.sessionAddress,
        sessionTime: currentSchedule.sessionTime,
      });
    }
  }, [scheduleDetailState.currentSchedule, sessionId, form]);

  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      const formData = form.getFieldsValue();
      const sessionDateInUTC = new Date(formData.sessionDate).toISOString(); // Chuyển đổi thời gian sang UTC
      await updateSchedule(sessionId, {
        ...formData,
        sessionDate: sessionDateInUTC,
      });
      message.success("Course updated successfully!");
      refetchSchedules();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the courses.");
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
            rules={[
              { required: true, message: "Please input the schedule name!" },
            ]}
          >
            <Input placeholder="Enter schedule name" />
          </Form.Item>
          <Form.Item
            label="Code"
            name="sessionCode"
            rules={[
              { required: true, message: "Please input the schedule code!" },
            ]}
          >
            <Input placeholder="Enter schedule code" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="sessionDate"
            rules={[
              { required: true, message: "Please select the schedule date!" },
            ]}
          >
            <Input
              type="datetime-local"
              placeholder="Enter schedule date"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="sessionAddress"
            rules={[
              { required: true, message: "Please input the schedule address!" },
            ]}
          >
            <Input placeholder="Enter schedule address" />
          </Form.Item>
          <Form.Item
            label="Time"
            name="sessionTime"
            rules={[
              { required: true, message: "Please input the time for exam!" },
            ]}
          >
            <Input placeholder="Enter time for exam" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateSchedule;
