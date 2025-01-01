import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import useUpdateVoucher from "../../hooks/Voucher/useUpdateVoucher";
import useVoucherDetail from "../../hooks/Voucher/useVoucherDetail";

import { EditOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../UI/CustomInput";

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
        voucherImage: currentVoucher.voucherImage,
        voucherName: currentVoucher.voucherName,
        voucherDescription: currentVoucher.voucherDescription,
        percentage: currentVoucher.percentage,
        creationDate: currentVoucher.creationDate
          ? new Date(currentVoucher.creationDate).toISOString().split("T")[0]
          : "",
        expiryDate: currentVoucher.expiryDate
          ? new Date(currentVoucher.expiryDate).toISOString().split("T")[0]
          : "",
        voucherLevel: currentVoucher.voucherLevel,
        examId: examIds,
        courseId: courseIds,
      });
    }
  }, [voucherDetailState.currentVoucher, voucherId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      let uploadedImageUrl = formData.certImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }      
      
      const updateData = {
        ...formData,
        voucherImage: uploadedImageUrl,
        examId: [], // Chuỗi rỗng mặc định
        courseId: [], // Chuỗi rỗng mặc định
      };
  
      await updateVoucherDetails(voucherId, updateData);
      refetchVouchers();
      setIsModalVisible(false);
      message.success("Voucher updated successfully!");
    } catch (error) {
      message.error("Failed to update the voucher.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when closing the modal
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
            label="VoucherLevel"
            name="voucherLevel"
            rules={[
              { required: true, message: "Please select voucher level!" },
            ]}
          >
            <Select placeholder="Select voucher level">
              <Select.Option value={0}>Bronze</Select.Option>
              <Select.Option value={1}>Silver</Select.Option>
              <Select.Option value={2}>Gold</Select.Option>
              <Select.Option value={3}>Diamond</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Voucher Image"
            name="voucherImage"            
          >            
            <img
              src={previewImage || voucherDetailState.currentVoucher?.voucherImage || ""}
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
        </Form>
      </Modal>
    </>
  );
};
export default UpdateVoucher;
