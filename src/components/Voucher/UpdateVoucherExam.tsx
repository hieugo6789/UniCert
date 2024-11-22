import { Form, message, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import useExamDetail from "../../hooks/SimulationExam/useExamDetail";
import useVoucher from "../../hooks/Voucher/useVoucher";
import voucherImage from "../../assets/icons/coupon.png";
import axios from "axios";

interface UpdateExamProps {
  examId: number;
  refetchExams: () => void;
}

const UpdateVoucherExam: React.FC<UpdateExamProps> = ({
  examId,
  refetchExams,
}) => {
  const [form] = Form.useForm();
  const { state: examDetailState, getExamDetails } = useExamDetail();
  const { voucher } = useVoucher();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch the exam details when the modal is shown
  const showModal = () => {
    setIsModalVisible(true);
    if (examId) {
      getExamDetails(examId); // Fetch exam details for the specific examId
    }
  };

  // Reset the modal and form fields when closed
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when closing the modal
  };

  // Function to handle the update and API call
  const handleUpdate = async () => {
    try {
      const formValues = form.getFieldsValue(); // Get selected voucherIds from form
      let voucherIds = formValues.voucherIds || [];

      // Ensure voucherIds is always an array
      if (!Array.isArray(voucherIds)) {
        voucherIds = [voucherIds];
      }

      // Prepare the data for the API request
      const payload = voucherIds;

      // Make the API call to update the vouchers for the exam
      const response = await axios.put(
        `https://certificateinformationportal.azurewebsites.net/api/v1/simulation-exam/${examId}/update-vouchers`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the success response
      if (response.status === 200) {
        message.success("Exam updated successfully!");
        refetchExams(); // Refresh the exams list after update
        setIsModalVisible(false); // Close modal after update
      }
    } catch (error) {
      console.error("Error updating exam vouchers:", error);
      message.error("Failed to update exam. Please try again.");
    }
  };

  useEffect(() => {
    if (examDetailState && examDetailState.currentExam.voucherDetails) {
      form.setFieldsValue({
        voucherIds: examDetailState.currentExam.voucherDetails.map(
          (voucher: any) => voucher.voucherId
        ),
      });
    }
  }, [examDetailState, form]);

  return (
    <>
      <img
        onClick={showModal}
        src={voucherImage}
        className="size-5 ml-3 cursor-pointer"
      />
      <Modal
        title="Update Exam"
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
            label="Vouchers"
            name="voucherIds"
            rules={[
              {
                required: false,
                message: "Please select at least one voucher!",
              },
            ]}
          >
            <Select
              placeholder="Select vouchers"
              style={{ width: "100%" }}
              allowClear
            >
              {voucher
                .filter((v) => v.voucherStatus === true) // Filter active vouchers
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateVoucherExam;
