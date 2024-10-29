import { Form, Input, message, Modal, Select } from "antd";
import useUpdateExam from "../../hooks/SimulationExam/useUpdateExam";
import useCertificate from "../../hooks/Certification/useCertificate";
import useVoucher from "../../hooks/Voucher/useVoucher";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

interface UpdateExamProps {
  examId: number;
  refetchExams: () => void;
}

const UpdateExam: React.FC<UpdateExamProps> = ({ examId, refetchExams }) => {
  const [form] = Form.useForm();
  const { updateExamDetails } = useUpdateExam();
  const { certificate } = useCertificate();
  const { voucher } = useVoucher();
  const { state: examDetailState, getExamDetails } = useExamDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (examId) {
      getExamDetails(examId);
    }
  };

  useEffect(() => {
    if (examDetailState.currentExam) {
      const currentExam = examDetailState.currentExam;
      const Vouchers = Array.isArray(currentExam.voucherDetails)
        ? currentExam.voucherDetails.map((vou) => vou.voucherId)
        : [];

      form.setFieldsValue({
        examName: currentExam.examName,
        examCode: currentExam.examCode,
        examDescription: currentExam.examDescription,
        examFee: currentExam.examFee,
        voucherIds: Vouchers,
        examImage: currentExam.examImage,
        certId: currentExam.certId,
      });
    }
  }, [examDetailState.currentExam, examId, form]);
  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      const formData = form.getFieldsValue();
      await updateExamDetails(examId, formData);
      message.success("exam updated successfully!");
      refetchExams();
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the exams.");
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
        title="Update Exam"
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
            name="examName"
            rules={[{ required: true, message: "Please enter the exam name" }]}
          >
            <Input placeholder="Enter exam name" />
          </Form.Item>
          <Form.Item
            label="Code"
            name="examCode"
            rules={[{ required: true, message: "Please enter the exam code" }]}
          >
            <Input placeholder="Enter exam code" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="examDescription"
            rules={[
              {
                required: true,
                message: "Please enter the exam description",
              },
            ]}
          >
            <Input placeholder="Enter exam description" />
          </Form.Item>
          <Form.Item
            label="Fee"
            name="examFee"
            rules={[
              {
                required: true,
                message: "Please enter the exam fee",
              },
            ]}
          >
            <Input placeholder="Enter exam fee" />
          </Form.Item>
          <Form.Item
            label="Vouchers"
            name="voucherIds"
          >
            <Select
              placeholder="Select vouchers"
              style={{ width: "100%" }}
              mode="multiple"
            >
              {voucher
                .filter((v) => v.voucherStatus === true)
                .map((v) => (
                  <Select.Option
                    key={v.voucherId}
                    value={v.voucherId}
                  >
                    {v.voucherName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Image"
            name="examImage"
            rules={[
              {
                required: true,
                message: "Please enter the exam image",
              },
            ]}
          >
            <Input placeholder="Enter exam image" />
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            label="Certification"
            name="certId"
          >
            <Select
              placeholder="Select Certification"
              style={{ width: "100%" }}
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
export default UpdateExam;
