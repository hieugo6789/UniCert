import { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd"; // Import Ant Design components
import { PlusOutlined } from "@ant-design/icons";
import { useCreateMajor } from "../../hooks/Major/useCreateMajor";
import useJob from "../../hooks/JobPosition/useJobPosition";
import axios from "axios";
import MyEditor from "../Editor/MyEditor";
import useAllCertification from "../../hooks/Certification/useAllCertification";

const CreateMajor = ({ refetchMajors }: { refetchMajors: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateMajor } = useCreateMajor();
  const { job } = useJob();
  const { certificate } = useAllCertification();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    majorName: "",
    majorCode: "",
    majorDescription: "",
    majorImage: "",
    jobPositionId: [] as number[],
    certId: [] as number[],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();
      let uploadedImageUrl = formData.majorImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        majorImage: uploadedImageUrl,
      };

      await handleCreateMajor(updatedFormData);
      form.resetFields();
      setFormData({
        majorName: "",
        majorCode: "",
        majorDescription: "",
        majorImage: "",
        jobPositionId: [],
        certId: [],
      });
      setSelectedImage(null);
      setPreviewImage(null);
      setIsModalVisible(false);
      refetchMajors();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating major:", error.response?.data);
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
  const handleSelectJobChange = (value: number[]) => {
    setFormData({
      ...formData,
      jobPositionId: Array.isArray(value) ? value : [value],
    });
  };
  const handleSelectCertChange = (value: number[]) => {
    setFormData({
      ...formData,
      certId: Array.isArray(value) ? value : [value],
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
      formUpload.append("folder", "Major");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/unicert/image/upload",
          formUpload
        );
        console.log("Certificate upload successfully:", response.data.url);
        return response.data.url;
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
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
        width={900}
        title="Create New Major"
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ jobPositionId: [], certId: [] }}
        >
          <Form.Item
            label="Major Name"
            name="majorName"
            rules={[
              { required: true, message: "Please input the major name!" },
            ]}
          >
            <Input
              name="majorName"
              value={formData.majorName}
              onChange={handleInputChange}
              placeholder="Enter major name"
            />
          </Form.Item>
          <Form.Item
            label="Major Code"
            name="majorCode"
            rules={[
              { required: true, message: "Please input the major code!" },
            ]}
          >
            <Input
              name="majorCode"
              value={formData.majorCode}
              onChange={handleInputChange}
              placeholder="Enter major code"
            />
          </Form.Item>

          <Form.Item
            label="Major Description"
            name="majorDescription"
            rules={[
              {
                required: true,
                message: "Please input the major description!",
              },
            ]}
          >
            <MyEditor
              value={formData.majorDescription}
              onChange={(content) =>
                setFormData({ ...formData, majorDescription: content })
              }
            />
          </Form.Item>
          <Form.Item
            label="Major Image"
            name="majorImage"
          >
            <img
              src={previewImage || formData.majorImage}
              alt="Current Image"
              className="w-32 h-32 bg-gray-300 mb-4"
            />
            <Input
              name="majorImage"
              onChange={handleImageChange}
              placeholder="Enter major image"
              type="file"
              required
            />
          </Form.Item>
          <Form.Item label="Job Position">
            <Select
              placeholder="Select Job position"
              onChange={handleSelectJobChange}
              style={{ width: "100%" }}
              mode="multiple"
              value={formData.jobPositionId}
            >
              {job.map((j) => (
                <Select.Option
                  key={j.jobPositionId}
                  value={j.jobPositionId}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {j.jobPositionName}
                    <span
                      style={{
                        color:
                          j.jobPositionPermission === "Approve"
                            ? "green"
                            : j.jobPositionPermission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {j.jobPositionPermission}
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Certification">
            <Select
              placeholder="Select Certification"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
              mode="multiple"
              value={formData.certId}
            >
              {certificate.map((cert) => (
                <Select.Option
                  key={cert.certId}
                  value={cert.certId}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{cert.certName}</span>
                    <span
                      style={{
                        color:
                          cert.permission === "Approve"
                            ? "green"
                            : cert.permission === "Reject"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {cert.permission}
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMajor;
