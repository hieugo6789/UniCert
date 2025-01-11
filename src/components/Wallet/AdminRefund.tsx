import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";
import Coin from "../../assets/images/Coin.png";

interface AdminRefundProps {
  walletId: number;
  onSuccess: () => void;
}

const AdminRefund: React.FC<AdminRefundProps> = ({ walletId, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values: { point: number }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://certificateinformationportal.azurewebsites.net/api/v1/refund/ProcessRefund`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, walletId }),
        }
      );
      const responseData = await response.json(); // Parse JSON response

      if (!response.ok) {
        throw new Error(responseData.message || "Refund failed");
      }

      onSuccess(); // Refetch data from parent
      handleCloseModal(); // Close modal
      message.success(responseData.message || "Refund processed successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Use error.message if it's an instance of Error
      } else {
        setErrorMessage("An unknown error occurred."); // Fallback for unknown errors
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src={Coin}
        alt="Coin"
        className="size-7 cursor-pointer"
        onClick={handleOpenModal}
      />
      <Modal
        title={
          <span className="text-blue-500 text-lg font-semibold">
            Process Refund - WalletID: {walletId}
          </span>
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Amount"
            name="point"
            rules={[
              { required: true, message: "Please enter the amount to refund!" },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter coins"
            />
          </Form.Item>
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleCloseModal}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AdminRefund;
