import { Button, Form, Input, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { useCreateAccount } from "../../hooks/Account/useCreateAccount";
import axios from "axios";

const { Option } = Select;

const CreateAccount = ({ refetch }: { refetch: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateAccount } = useCreateAccount();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentDate = new Date();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    dob: currentDate,
    address: "",
    phoneNumber: "",
    role: "",
    status: true,
    userImage: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOK = async () => {
    try {
      await form.validateFields();

      await handleCreateAccount(formData);
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating voucher:", error.response?.data);
        setErrorMessage(
          error.response?.data?.message || "Failed to create question."
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
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
  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
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
        Account
      </Button>
      <Modal
        title="Create New Account "
        width={800}
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input the user name!",
              },
              {
                min: 3,
                message: "Username must be at least 3 characters long!",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "Username must be alphanumeric!",
              },
            ]}
          >
            <Input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter user name"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input full name!",
              },
            ]}
          >
            <Input
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter full name"
            />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              {
                required: true,
                message: "Please input the date of birth!",
              },
              {
                validator: (_, value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  const age =
                    currentDate.getFullYear() - selectedDate.getFullYear();
                  const isAdult =
                    age > 18 || (age === 18 && currentDate >= selectedDate);

                  return isAdult
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("User must be at least 18 years old!")
                      );
                },
              },
            ]}
          >
            <Input
              name="dob"
              type="date"
              value={formData.dob.toISOString().split("T")[0]} // Format to YYYY-MM-DD
              onChange={(e) => {
                setFormData({
                  ...formData,
                  dob: new Date(e.target.value), // Convert to Date object
                });
              }}
              placeholder="Enter date of birth"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
              {
                min: 10,
                message: "Address must be at least 10 characters long!",
              },
            ]}
          >
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input phone number!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must contain only digits!",
              },
              {
                min: 10,
                max: 10,
                message: "Phone number must be exactly 10 characters",
              },
            ]}
          >
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select a role!",
              },
            ]}
          >
            <Select
              value={formData.role}
              onChange={handleRoleChange}
              placeholder="Select a role"
            >
              <Option value="Staff">Staff</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item>
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default CreateAccount;
