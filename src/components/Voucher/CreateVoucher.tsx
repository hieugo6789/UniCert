import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateVoucher } from "../../hooks/Voucher/useCreateVoucher";
import useExam from "../../hooks/SimulationExam/useExam";
import useCourse from "../../hooks/Course/useCourse";
import axios from "axios";

const CreateVoucher = ({
  refetchVouchers,
}: {
  refetchVouchers: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateVoucher } = useCreateVoucher();
  const { exam } = useExam();
  const { course } = useCourse();
  const [form] = Form.useForm();

  const currentDate = new Date();
  const expiryDate = new Date(currentDate);
  expiryDate.setDate(expiryDate.getDate() + 2);

  const [formData, setFormData] = useState({
    voucherName: "",
    voucherDescription: "",
    percentage: 0,
    creationDate: currentDate,
    expiryDate: expiryDate,
    examId: [] as number[],
    courseId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();

      await handleCreateVoucher(formData);
      setIsModalVisible(false);
      refetchVouchers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating voucher:", error.response?.data);
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

  const handleSelectExamChange = (value: number[]) => {
    setFormData({
      ...formData,
      examId: value,
    });
  };

  const handleSelectCourseChange = (value: number[]) => {
    setFormData({
      ...formData,
      courseId: value,
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
        Voucher
      </Button>
      <Modal
        title="Create New Voucher"
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
            voucherName: formData.voucherName,
            voucherDescription: formData.voucherDescription,
            percentage: formData.percentage,
            creationDate: formData.creationDate.toISOString().substring(0, 10),
            expiryDate: formData.expiryDate.toISOString().substring(0, 10),
            examId: formData.examId,
            courseId: formData.courseId,
          }}
        >
          <Form.Item
            label="Voucher Name"
            name="voucherName"
            rules={[
              { required: true, message: "Please input the voucher name!" },
            ]}
          >
            <Input
              name="voucherName"
              value={formData.voucherName}
              onChange={handleInputChange}
              placeholder="Enter voucher name"
            />
          </Form.Item>

          <Form.Item
            label="Voucher Description"
            name="voucherDescription"
            rules={[
              {
                required: true,
                message: "Please input the voucher description!",
              },
            ]}
          >
            <Input
              name="voucherDescription"
              value={formData.voucherDescription}
              onChange={handleInputChange}
              placeholder="Enter voucher description"
            />
          </Form.Item>

          <Form.Item
            label="Discount Percentage"
            name="percentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <Input
              name="percentage"
              type="number"
              value={formData.percentage}
              onChange={handleInputChange}
              placeholder="Enter discount percentage"
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
              value={
                formData.creationDate
                  ? formData.creationDate.toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) => {
                const date = new Date(e.target.value);
                setFormData({ ...formData, creationDate: date });
                form.setFieldsValue({
                  creationDate: date.toISOString().substring(0, 10),
                });
              }}
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
              value={
                formData.expiryDate
                  ? formData.expiryDate.toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expiryDate: new Date(e.target.value),
                })
              }
            />
          </Form.Item>
          <Form.Item label="Exams">
            <Select
              placeholder="Select exams"
              onChange={handleSelectExamChange}
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

          <Form.Item label="Courses">
            <Select
              placeholder="Select courses"
              onChange={handleSelectCourseChange}
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

export default CreateVoucher;
