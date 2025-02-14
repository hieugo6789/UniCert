import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateVoucher } from "../../hooks/Voucher/useCreateVoucher";

import axios from "axios";
import CustomInput from "../UI/CustomInput";

const CreateVoucher = ({
  refetchVouchers,
}: {
  refetchVouchers: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateVoucher } = useCreateVoucher();

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
    voucherImage: "",
    voucherLevel: 0,
    examId: [] as number[],
    courseId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();
      let uploadedImageUrl = formData.voucherImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        voucherImage: uploadedImageUrl,
      };
      await handleCreateVoucher(updatedFormData);
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Selected image file:", file);
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadCloudinary = async () => {
    if (selectedImage) {
      const formUpload = new FormData();
      formUpload.append("api_key", "994636724857583");
      formUpload.append("file", selectedImage);
      formUpload.append("upload_preset", "upload_image");
      formUpload.append("folder", "Voucher");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/unicert/image/upload",
          formUpload
        );
        console.log("Voucher upload successfully:", response.data.url);
        return response.data.url;
      } catch (error) {
        console.error("Error uploading voucher:", error);
      }
    }
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
        style={{
          height: "40px",
          maxWidth: "180px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundImage: "linear-gradient(135deg, #6a11cb, #2575fc)",
          boxShadow: "0px 4px 15px rgba(39, 70, 144, 0.3)",
        }}
        className="rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        Create Voucher
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
            voucherImage: formData.voucherImage,
            creationDate: formData.creationDate.toISOString().substring(0, 10),
            expiryDate: formData.expiryDate.toISOString().substring(0, 10),
            voucherLevel: formData.voucherLevel,
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
            label="Voucher Image"
            name="voucherImage"            
          >
            <img
              src={previewImage || formData.voucherImage}
              alt="Current Image"
              className="w-32 h-32 bg-gray-300 mb-4"
            />
            <CustomInput
              placeholder="Image"
              type="file"
              onChange={handleImageChange}
              required
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
          <Form.Item
            label="Voucher Level"
            name="voucherLevel"
            rules={[
              {
                required: true,
                message: "Please select the voucher level!",
              },
            ]}
          >
            <Select
              value={formData.voucherLevel}
              onChange={(value) =>
                setFormData({ ...formData, voucherLevel: value })
              }
              placeholder="Select voucher level"
            >
              <Select.Option value={0}>Bronze</Select.Option>
              <Select.Option value={1}>Gold</Select.Option>
              <Select.Option value={2}>Silver</Select.Option>
              <Select.Option value={3}>Platinum</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateVoucher;
