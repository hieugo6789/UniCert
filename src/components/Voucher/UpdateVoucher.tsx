import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import useUpdateVoucher from "../../hooks/Voucher/useUpdateVoucher";
import useVoucherDetail from "../../hooks/Voucher/useVoucherDetail";
import useExam from "../../hooks/SimulationExam/useExam";
import useCourse from "../../hooks/Course/useCourse";
import { EditOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

interface UpdateVoucherProps {
  voucherId: number;
  refetchVouchers: () => void;
}

const UpdateVoucher: React.FC<UpdateVoucherProps> = ({
  voucherId,
  refetchVouchers,
}) => {
  const [form] = Form.useForm();
  const { updateVoucherDetails } = useUpdateVoucher();
  const { state: voucherDetailState, getVoucherDetails } = useVoucherDetail();
  const { exam } = useExam();
  const { course } = useCourse();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (voucherId) {
      getVoucherDetails(voucherId);
    }
  };

  useEffect(() => {
    if (voucherDetailState.currentVoucher) {
      const currentVoucher = voucherDetailState.currentVoucher;
      const examIds = Array.isArray(currentVoucher.examDetails)
        ? currentVoucher.examDetails.map((exam) => exam.examId)
        : [];
      const courseIds = Array.isArray(currentVoucher.courseDetails)
        ? currentVoucher.courseDetails.map((course) => course.courseId)
        : [];

      form.setFieldsValue({
        voucherName: currentVoucher.voucherName,
        voucherDescription: currentVoucher.voucherDescription,
        percentage: currentVoucher.percentage,
        creationDate: currentVoucher.creationDate
          ? new Date(currentVoucher.creationDate).toISOString().split("T")[0]
          : "",
        expiryDate: currentVoucher.expiryDate
          ? new Date(currentVoucher.expiryDate).toISOString().split("T")[0]
          : "",
        examId: examIds,
        courseId: courseIds,
      });
    }
  }, [voucherDetailState.currentVoucher, voucherId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue(); // Get form data from form state
      await updateVoucherDetails(voucherId, formData);
      message.success("Voucher updated successfully!");
      refetchVouchers();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the voucher.");
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
        title="Update Voucher"
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
            label="Voucher Name"
            name="voucherName"
            rules={[
              { required: true, message: "Please input the voucher name!" },
            ]}
          >
            <Input placeholder="Enter voucher name" />
          </Form.Item>
          <Form.Item
            label="Voucher Description"
            name="voucherDescription"
            rules={[
              { required: true, message: "Please input the voucher code!" },
            ]}
          >
            <Input placeholder="Enter voucher code" />
          </Form.Item>
          <Form.Item
            label="Percentage"
            name="percentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter voucher percentage"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Creation Date"
            name="creationDate"
            rules={[
              { required: true, message: "Please select the creation date!" },
            ]}
          >
            <Input
              type="date"
              placeholder="Enter creation date"
            />
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[
              { required: true, message: "Please select the expiry date!" },
            ]}
          >
            <Input
              type="date"
              placeholder="Enter expiry date"
            />
          </Form.Item>
          <Form.Item
            label="Simulation exams"
            name="examId"
          >
            <Select
              placeholder="Select simulation exams"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {exam.map((e) => (
                <Select.Option
                  key={e.examId}
                  value={e.examId}
                >
                  {e.examName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Courses"
            name="courseId"
          >
            <Select
              placeholder="Select courses"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {course.map((c) => (
                <Select.Option
                  key={c.courseId}
                  value={c.courseId}
                >
                  {c.courseName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateVoucher;
