import { Input, Modal, Form, InputNumber, Select, message } from "antd";
import { useState, useEffect } from "react";
import useUpdateCert from "../../hooks/useUpdateCert";
import useOrganization from "../../hooks/useOrganization";
import useCertificate from "../../hooks/useCertificate";
import MyEditor from "../Editor/MyEditor";
import useCertType from "../../hooks/useCertType";
import useCertDetail from "../../hooks/useCertDetail";
import { EditOutlined } from "@ant-design/icons";

interface UpdateCertProps {
  certId: string;
}

const UpdateCert: React.FC<UpdateCertProps> = ({ certId }) => {
  const [form] = Form.useForm();
  const { updateCertDetails, state } = useUpdateCert();
  const { organization } = useOrganization();
  const { certificate } = useCertificate();
  const { certType } = useCertType();
  const { state: certDetailState, getCertDetails } = useCertDetail();

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

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
    certIdPrerequisites: [] as number[],
  });
  useEffect(() => {
    if (certId) {
      getCertDetails(certId);
    }
  }, [certId]);

  // Load certificate data when certId changes
  useEffect(() => {
    if (certDetailState.currentCert) {
      const currentCert = certDetailState.currentCert;
      console.log("Current certificate data:", currentCert);
      setFormData({
        certName: currentCert.certName,
        certCode: currentCert.certCode,
        certDescription: currentCert.certDescription,
        certCost: currentCert.certCost,
        certPointSystem: currentCert.certPointSystem,
        certImage: currentCert.certImage,
        certValidity: currentCert.certValidity,
        typeId: currentCert.typeId,
        organizeId: currentCert.organizeId,
        certIdPrerequisites: currentCert.certPrerequisiteId || [],
      });
      form.setFieldsValue(currentCert);
    }
  }, [state.currentCert, certId, form]);

  const handleUpdate = async () => {
    try {
      // Validate fields before submission
      await form.validateFields();
      await updateCertDetails(certId, formData);
      message.success("Certificate updated successfully!");
      setIsModalVisible(false); // Close modal after success
    } catch (error) {
      message.error("Failed to update the certificate.");
    }
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

  const showModal = () => {
    setIsModalVisible(true);
    if (certId) {
      getCertDetails(certId); // Fetch certificate details
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
      {/* <Button
        type="primary"
      >
        Update Certificate
      </Button> */}
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
              value={formData.typeId}
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
              value={formData.organizeId}
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
              value={formData.certIdPrerequisites}
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

export default UpdateCert;
