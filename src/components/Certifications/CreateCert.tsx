import { Button, Input, Modal, Form, InputNumber, Select } from "antd";
import CustomInput from "../../components/UI/CustomInput";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateCert } from "../../hooks/Certification/useCreateCert";
import useOrganization from "../../hooks/Organization/useOrganization";
import useCertificate from "../../hooks/Certification/useCertificate";
import MyEditor from "../Editor/MyEditor";
import axios from "axios";
import useCertType from "../../hooks/Certification/useCertType";
import useMajor from "../../hooks/Major/useMajor";
import useJob from "../../hooks/JobPosition/useJobPosition";

const CreateCert = ({
  refetchCertificates,
}: {
  refetchCertificates: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateCert } = useCreateCert();
  const [form] = Form.useForm(); // Initialize form instance
  const [formData, setFormData] = useState({
    certName: "",
    certCode: "",
    certDescription: "",
    certCost: 0,
    certPointSystem: "",
    certImage: "",
    certValidity: "",
    typeId: 0,
    organizeId: 0,
    certIdPrerequisites: [0] as number[],
    majorIds: [0] as number[],
    jobIds: [0] as number[],
  });
  const { organization } = useOrganization();
  const { certificate } = useCertificate();
  const { certType } = useCertType();
  const { major } = useMajor();
  const { job } = useJob();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await form.validateFields();

      let uploadedImageUrl = formData.certImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        certImage: uploadedImageUrl,
      };
      await handleCreateCert(updatedFormData);
      setIsModalVisible(false);
      refetchCertificates();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating certification:", error.response?.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectTypeChange = (value: number) => {
    setFormData({
      ...formData,
      typeId: value,
    });
  };

  const handleSelectChange = (value: number) => {
    setFormData({
      ...formData,
      organizeId: value,
    });
  };

  const handleSelectCertChange = (value: number[]) => {
    setFormData({
      ...formData,
      certIdPrerequisites: Array.isArray(value) ? value : [value],
    });
  };
  const handleSelectMajorChange = (value: number[]) => {
    setFormData({
      ...formData,
      majorIds: Array.isArray(value) ? value : [value],
    });
  };
  const handleSelectJobChange = (value: number[]) => {
    setFormData({
      ...formData,
      jobIds: Array.isArray(value) ? value : [value],
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
      formUpload.append("folder", "Certificate");

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
      >
        Certification
      </Button>
      <Modal
        title="Tạo Certificate"
        open={isModalVisible}
        width={800}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
        >
          <Form.Item
            label="Name"
            name="certName"
            rules={[
              { required: true, message: "Please enter the certificate name" },
            ]}
          >
            <Input
              name="certName"
              value={formData.certName}
              onChange={handleInputChange}
              placeholder="Enter certificate name"
            />
          </Form.Item>

          <Form.Item
            label="Code"
            name="certCode"
            rules={[
              { required: true, message: "Please enter the certificate code" },
            ]}
          >
            <Input
              name="certCode"
              value={formData.certCode}
              onChange={handleInputChange}
              placeholder="Enter certificate code"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="certDescription"
            rules={[
              {
                required: true,
                message: "Please enter the certificate description",
              },
            ]}
          >
            <MyEditor
              value={formData.certDescription}
              onChange={(content) =>
                setFormData({ ...formData, certDescription: content })
              }
            />
          </Form.Item>

          <Form.Item
            label="Cost"
            name="certCost"
          >
            <InputNumber
              name="certCost"
              value={formData.certCost}
              onChange={(value) =>
                setFormData({ ...formData, certCost: value ?? 0 })
              }
              placeholder="Enter certificate cost"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Point System"
            name="certPointSystem"
          >
            <Input
              name="certPointSystem"
              value={formData.certPointSystem}
              onChange={handleInputChange}
              placeholder="Enter point system"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="certImage"
          >
            <img
              src={previewImage || formData.certImage}
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
            label="Validity"
            name="certValidity"
            rules={[
              { required: true, message: "Please enter the validity period" },
            ]}
          >
            <Input
              name="certValidity"
              value={formData.certValidity}
              onChange={handleInputChange}
              placeholder="Enter validity period"
            />
          </Form.Item>

          <Form.Item
            label="Level"
            name="typeId"
            rules={[
              {
                required: true,
                message: "Please select a certification level",
              },
            ]}
          >
            <Select
              placeholder="Select Certification level"
              onChange={handleSelectTypeChange}
              style={{ width: "100%" }}
            >
              {certType.map((ct) => (
                <Select.Option
                  key={ct.typeId}
                  value={ct.typeId}
                >
                  {ct.typeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Organization"
            name="organizeId"
            rules={[
              { required: true, message: "Please select an organization" },
            ]}
          >
            <Select
              placeholder="Select Organization"
              onChange={handleSelectChange}
              style={{ width: "100%" }}
            >
              {organization.map((org) => (
                <Select.Option
                  key={org.organizeId}
                  value={org.organizeId}
                >
                  {org.organizeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Prerequisite Certifications">
            <Select
              placeholder="Select Prerequisite certifications"
              onChange={handleSelectCertChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {certificate.map((cert) => (
                <Select.Option
                  key={cert.certId}
                  value={cert.certId}
                >
                  {cert.certName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Major"
            name="majorId"
            rules={[{ required: true, message: "Please select a major" }]}
          >
            <Select
              placeholder="Select majors"
              onChange={handleSelectMajorChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {major.map((m) => (
                <Select.Option
                  key={m.majorId}
                  value={m.majorId}
                >
                  {m.majorName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Job position"
            name="jobPositionId"
            rules={[
              { required: true, message: "Please select a job position" },
            ]}
          >
            <Select
              placeholder="Select job positions"
              onChange={handleSelectJobChange}
              style={{ width: "100%" }}
              mode="multiple"
            >
              {job.map((j) => (
                <Select.Option
                  key={j.jobPositionId}
                  value={j.jobPositionId}
                >
                  {j.jobPositionName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCert;
