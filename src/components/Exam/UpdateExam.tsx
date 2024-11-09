import { Form, Input, InputNumber, message, Modal, Select } from "antd";
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
        duration: currentExam.duration,
        questionCount: currentExam.questionCount,
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
      let uploadedImageUrl = formData.examImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        examImage: uploadedImageUrl,
      };

      await updateExamDetails(examId, updatedFormData);
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
            <InputNumber
              placeholder="Enter exam fee"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              {
                required: true,
                message: "Please enter duration",
              },
            ]}
          >
            <InputNumber
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
                message: "Please enter total questions",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter total questions"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="examImage"            
          >
            <img
              src={previewImage || examDetailState.currentExam.examImage}
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
        </Form>
      </Modal>
    </>
  );
};
export default UpdateExam;
