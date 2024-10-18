import { Button, Input, Modal, Form, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateCert } from "../../hooks/useCreateCert";
import useOrganization from "../../hooks/useOrganization";
import useCertificate from "../../hooks/useCertificate";
import MyEditor from "../Editor/MyEditor";
import axios from "axios";
import useCertType from "../../hooks/useCertType";

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
  });
  const { organization } = useOrganization();
  const { certificate } = useCertificate();
  const { certType } = useCertType();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();

      await handleCreateCert(formData);
      setIsModalVisible(false);
      refetchCertificates();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating certification:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("An unexpected error occurred:", error);
      } else {
        console.error("Validation failed.");
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
            rules={[
              { required: true, message: "Please enter the certificate cost" },
            ]}
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
            rules={[
              { required: true, message: "Please enter the point system" },
            ]}
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
            rules={[
              {
                required: true,
                message: "Please enter the certificate image URL",
              },
            ]}
          >
            <Input
              name="certImage"
              value={formData.certImage}
              onChange={handleInputChange}
              placeholder="Enter certificate image URL"
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
        </Form>
      </Modal>
    </>
  );
};

export default CreateCert;
