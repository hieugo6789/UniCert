import { Form, Input, message, Modal, Select } from "antd";
import useUpdateMajor from "../../hooks/Major/useUpdateMajor";
import { useEffect, useState } from "react";
import useJob from "../../hooks/JobPosition/useJobPosition";
import useMajorDetail from "../../hooks/Major/useMajorDetail";
import { EditOutlined } from "@ant-design/icons";
import MyEditor from "../Editor/MyEditor";
import axios from "axios";
import useAllCertification from "../../hooks/Certification/useAllCertification";

interface UpdateMajorProps {
  majorId: string;
  refetchMajors: () => void;
}

const UpdateMajor: React.FC<UpdateMajorProps> = ({
  majorId,
  refetchMajors,
}) => {
  const [form] = Form.useForm();
  const { updateMajorDetails } = useUpdateMajor();
  const { job } = useJob();
  const { certificate } = useAllCertification();
  const { state: majorDetailState, getMajorDetails } = useMajorDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    if (majorId) {
      getMajorDetails(majorId);
    }
  };

  useEffect(() => {
    if (majorDetailState.currentMajor) {
      const currentMajor = majorDetailState.currentMajor;
      const jobPositionIds = Array.isArray(currentMajor.jobPositionDetails)
        ? currentMajor.jobPositionDetails.map((job) => job.jobPositionId)
        : [];
      const certIds = Array.isArray(currentMajor.certificationDetails)
        ? currentMajor.certificationDetails.map((cert) => cert.certId)
        : [];

      // Update form fields directly
      form.setFieldsValue({
        majorName: currentMajor.majorName || "",
        majorCode: currentMajor.majorCode || "",
        majorDescription: currentMajor.majorDescription || "",
        majorImage: currentMajor.majorImage || "",
        jobPositionId: jobPositionIds,
        certId: certIds,
      });
    }
  }, [majorDetailState.currentMajor, majorId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue(); // Get form data from form state

      let uploadedImageUrl = formData.majorImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        majorImage: uploadedImageUrl,
      };

      await updateMajorDetails(majorId, updatedFormData);
      message.success("Major updated successfully!");
      refetchMajors();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the major.");
    }
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
        title="Update Major"
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
            label="Major Name"
            name="majorName"
            rules={[
              { required: true, message: "Please input the major name!" },
            ]}
          >
            <Input placeholder="Enter major name" />
          </Form.Item>
          <Form.Item
            label="Major Code"
            name="majorCode"
            rules={[
              { required: true, message: "Please input the major code!" },
            ]}
          >
            <Input placeholder="Enter major code" />
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
              value={form.getFieldValue("majorDescription")} // Sync editor value with form
              onChange={(content) =>
                form.setFieldsValue({ majorDescription: content })
              }
            />
          </Form.Item>
          <Form.Item
            label="Major Image"
            name="majorImage"
          >
            <img
              src={previewImage || majorDetailState.currentMajor.majorImage}
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
          <Form.Item
            label="Job Position"
            name="jobPositionId"
          >
            <Select
              placeholder="Select Job position"
              style={{ width: "100%" }}
              mode="multiple"
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
          <Form.Item
            label="Certification"
            name="certId"
          >
            <Select
              placeholder="Select Job position"
              style={{ width: "100%" }}
              mode="multiple"
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

export default UpdateMajor;
