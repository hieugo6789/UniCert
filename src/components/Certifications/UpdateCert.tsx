import { Input, Modal, Form, InputNumber, Select, message } from "antd";
import CustomInput from "../../components/UI/CustomInput";
import { useState, useEffect } from "react";
import useUpdateCert from "../../hooks/Certification/useUpdateCert";
import useOrganization from "../../hooks/Organization/useOrganization";
import useCertificate from "../../hooks/Certification/useCertificate";
import MyEditor from "../Editor/MyEditor";
import useCertType from "../../hooks/Certification/useCertType";
import useCertDetail from "../../hooks/Certification/useCertDetail";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import useMajor from "../../hooks/Major/useMajor";
import useJob from "../../hooks/JobPosition/useJobPosition";

interface UpdateCertProps {
  certId: number;
  refetchCertificates: () => void;
}

const UpdateCert: React.FC<UpdateCertProps> = ({
  certId,
  refetchCertificates,
}) => {
  const [form] = Form.useForm();
  const { updateCertDetails, state } = useUpdateCert();
  const { organization } = useOrganization();
  const { certificate } = useCertificate();
  const { major } = useMajor();
  const { job } = useJob();
  const { certType } = useCertType();
  const { state: certDetailState, getCertDetails } = useCertDetail();

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const showModal = () => {
    setIsModalVisible(true);
    if (certId) {
      getCertDetails(certId);
    }
  };
  useEffect(() => {
    if (certDetailState.currentCert) {
      const currentCert = certDetailState.currentCert;

      form.setFieldsValue({
        certName: currentCert.certName || "",
        certCode: currentCert.certCode || "",
        certDescription: currentCert.certDescription || "",
        certCost: currentCert.certCost || 0,
        certPointSystem: currentCert.certPointSystem || "",
        certImage: currentCert.certImage || "",
        certValidity: currentCert.certValidity || "",
        typeId: currentCert.typeId || "",
        organizeId: currentCert.organizeId || "",
        certIdPrerequisites: currentCert.certPrerequisiteId || [],
        majorIds: currentCert.majorIds || [],
        jobIds: currentCert.jobPositionIds || [],
      });
    }
  }, [state.currentCert, certId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      let uploadedImageUrl = formData.certImage;

      if (selectedImage) {
        uploadedImageUrl = await uploadCloudinary();
        console.log("New uploaded image URL:", uploadedImageUrl);
      }

      const updatedFormData = {
        ...formData,
        certImage: uploadedImageUrl,
      };

      await updateCertDetails(certId, updatedFormData);
      message.success("Certificate updated successfully!");
      refetchCertificates();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to update the certificate.", error);
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <EditOutlined
        onClick={showModal}
        style={{ marginLeft: 12 }}
      />

      <Modal
        title="Update Certificate"
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
            name="certName"
            rules={[
              { required: true, message: "Please enter the certificate name" },
            ]}
          >
            <Input placeholder="Enter certificate name" />
          </Form.Item>

          <Form.Item
            label="Code"
            name="certCode"
            rules={[
              { required: true, message: "Please enter the certificate code" },
            ]}
          >
            <Input placeholder="Enter certificate code" />
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
              value={form.getFieldValue("certDescription")}
              onChange={(content) =>
                form.setFieldsValue({ certDescription: content })
              }
            />
          </Form.Item>

          <Form.Item
            label="Cost"
            name="certCost"
          >
            <InputNumber
              placeholder="Enter certificate cost"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Point System"
            name="certPointSystem"
          >
            <Input placeholder="Enter point system" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="certImage"
          >
            <img
              src={previewImage || certDetailState.currentCert.certImage}
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
            <Input placeholder="Enter validity period" />
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

          <Form.Item
            label="Prerequisite Certifications"
            name="certIdPrerequisites"
          >
            <Select
              placeholder="Select Prerequisite certifications"
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
            label="Majors"
            name="majorIds"
            rules={[
              {
                required: true,
                message: "Please select majors",
              },
            ]}
          >
            <Select
              placeholder="Select majors"
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
            label="Job positions"
            name="jobIds"
            rules={[
              {
                required: true,
                message: "Please select job positions",
              },
            ]}
          >
            <Select
              placeholder="Select job positions"
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

export default UpdateCert;
