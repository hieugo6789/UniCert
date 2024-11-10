import { useState } from "react";
import useCertificate from "../../hooks/Certification/useCertificate";
import useVoucher from "../../hooks/Voucher/useVoucher";
import { useCreateExam } from "../../hooks/SimulationExam/useCreateExam";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const CreateExam = ({ refetchExams }: { refetchExams: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, handleCreateExam } = useCreateExam();
  const { certificate } = useCertificate();
  const { voucher } = useVoucher();

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    examName: "",
    examCode: "",
    examDescription: "",
    examFee: 0,
    voucherIds: [] as number[],
    examImage: "",
    certId: 0,
    duration: 0,
    questionCount: 0,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOK = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();

      let uploadedImageUrl = formData.examImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        examImage: uploadedImageUrl,
      };

      await handleCreateExam(updatedFormData);
      form.resetFields();
      setFormData({
        examName: "",
        examCode: "",
        examDescription: "",
        examFee: 0,
        voucherIds: [],
        examImage: "",
        certId: 0,
        duration: 0,
        questionCount: 0,
      });
      setSelectedImage(null);
      setPreviewImage(null);
      setIsModalVisible(false);
      refetchExams();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating simulation exam:", error.response?.data);
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
  const handleSelectVoucherChange = (value: number[]) => {
    setFormData({
      ...formData,
      voucherIds: Array.isArray(value) ? value : [value],
    });
  };
  const handleSelectCertChange = (value: number) => {
    setFormData({
      ...formData,
      certId: value,
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
      formUpload.append("folder", "Exam");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/unicert/image/upload",
          formUpload
        );
        console.log("Exam upload successfully:", response.data.url);
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
        style={{ maxWidth: "120px" }}
      >
        Exam
      </Button>
      <Modal
        title="Create New Exam"
        width={900}
        open={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        confirmLoading={state.isCreating}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={formData}
        >
          <Form.Item
            label="Exam Name"
            name="examName"
            rules={[
              {
                required: true,
                message: "Please input the exam name!",
              },
            ]}
          >
            <Input
              name="examName"
              value={formData.examName}
              onChange={handleInputChange}
              placeholder="Enter exam name"
            />
          </Form.Item>
          <Form.Item
            label="Exam Code"
            name="examCode"
            rules={[
              {
                required: true,
                message: "Please input the exam code!",
              },
            ]}
          >
            <Input
              name="examCode"
              value={formData.examCode}
              onChange={handleInputChange}
              placeholder="Enter exam code"
            />
          </Form.Item>

          <Form.Item
            label="Exam Description"
            name="examDescription"
            rules={[
              {
                required: true,
                message: "Please input the exam description!",
              },
            ]}
          >
            <Input
              name="examDescription"
              value={formData.examDescription}
              onChange={handleInputChange}
              placeholder="Enter exam description"
            />
          </Form.Item>
          <Form.Item
            label="Fee"
            name="examFee"
            rules={[
              {
                required: true,
                message: "Please input the exam fee!",
              },
            ]}
          >
            <InputNumber
              name="examFee"
              value={formData.examFee}
              onChange={(value) =>
                setFormData({ ...formData, examFee: value ?? 0 })
              }
              placeholder="Enter exam fee"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[
              {
                required: true,
                message: "Please input duration!",
              },
            ]}
          >
            <InputNumber
              name="duration"
              value={formData.duration}
              onChange={(value) =>
                setFormData({ ...formData, duration: value ?? 0 })
              }
              placeholder="Enter duration"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Total questions"
            name="questionCount"
            rules={[
              {
                required: true,
                message: "Please input total questions!",
              },
            ]}
          >
            <InputNumber
              name="questionCount"
              value={formData.questionCount}
              onChange={(value) =>
                setFormData({ ...formData, questionCount: value ?? 0 })
              }
              placeholder="Enter total questions"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Exam Image"
            name="examImage"
          >
            <img
              src={previewImage || formData.examImage}
              alt="Current Image"
              className="w-32 h-32 bg-gray-300 mb-4"
            />
            <Input
              name="examImage"
              type="file"
              onChange={handleImageChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="Certification"
            name="certId"
            rules={[
              {
                required: true,
                message: "Please input the certification!",
              },
            ]}
          >
            <Select
              placeholder="Select Certification"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
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
          <Form.Item label="Voucher">
            <Select
              placeholder="Select Voucher"
              onChange={handleSelectVoucherChange}
              style={{ width: "100%" }}
              mode="multiple"
              value={formData.voucherIds}
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
        </Form>
      </Modal>
    </>
  );
};
export default CreateExam;
