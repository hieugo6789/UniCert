import { useState } from "react";
import { Modal, Button, Form, Input } from "antd"; // Import Ant Design components
// import { useAppDispatch } from "../../redux/hook";
import { MajorInput } from "../../models/major";
import agent from "../../utils/agent";
import { PlusOutlined } from "@ant-design/icons";

const CreateMajor = () => {
  // const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields on cancel
  };

  const handleSubmit = async (values: MajorInput) => {
    setLoading(true);
    try {
      // Call createMajors API
      await agent.Major.createMajors(values);

      form.resetFields(); // Reset form fields after submission
      setIsModalVisible(false); // Close modal after submission
    } catch (error) {
      console.error("Error creating major:", error);
      alert("Failed to create major.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
        style={{ maxWidth: "80px" }}
      >
        Major
      </Button>

      <Modal
        title="Create New Major"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons (OK/Cancel)
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Major Code"
            name="majorCode"
            rules={[
              { required: true, message: "Please input the major code!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major Name"
            name="majorName"
            rules={[
              { required: true, message: "Please input the major name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major Description"
            name="majorDescription"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
            <Button
              onClick={handleCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMajor;
