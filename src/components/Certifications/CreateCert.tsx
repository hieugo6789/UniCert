import { Button, Input, Modal, Form, InputNumber, Select } from "antd";
import { useState } from "react";
import { useCreateCert } from "../../hooks/useCreateCert";
import useOrganization from "../../hooks/useOrganization";
import useCertificate from "../../hooks/useCertificate";

const CreateCert = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleCreateCert } = useCreateCert();
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
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOK = async () => {
    try {
      await handleCreateCert(formData);
      setIsModalVisible(false);
      console.log(formData);
    } catch (error) {
      console.error("Failed to create certificate:", error);
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
        type="primary"
        onClick={showModal}
      >
        + Certificate
      </Button>
      <Modal
        title="Tạo Certificate"
        visible={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            required
          >
            <Input
              name="certName"
              value={formData.certName}
              onChange={handleInputChange}
              placeholder="Enter certificate name"
              required
            />
          </Form.Item>

          <Form.Item
            label="Code"
            required
          >
            <Input
              name="certCode"
              value={formData.certCode}
              onChange={handleInputChange}
              placeholder="Enter certificate code"
              required
            />
          </Form.Item>

          <Form.Item
            label="Description"
            required
          >
            <Input
              name="certDescription"
              value={formData.certDescription}
              onChange={handleInputChange}
              placeholder="Enter certificate description"
              required
            />
          </Form.Item>

          <Form.Item
            label="Cost"
            required
          >
            <InputNumber
              name="certCost"
              value={formData.certCost}
              onChange={(value) =>
                setFormData({ ...formData, certCost: value ?? 0 })
              }
              placeholder="Enter certificate cost"
              style={{ width: "100%" }}
              required
            />
          </Form.Item>

          <Form.Item
            label="Point System"
            required
          >
            <Input
              name="certPointSystem"
              value={formData.certPointSystem}
              onChange={handleInputChange}
              placeholder="Enter point system"
              required
            />
          </Form.Item>

          <Form.Item
            label="Image"
            required
          >
            <Input
              name="certImage"
              value={formData.certImage}
              onChange={handleInputChange}
              placeholder="Enter certificate image URL"
              required
            />
          </Form.Item>

          <Form.Item
            label="Validity"
            required
          >
            <Input
              name="certValidity"
              value={formData.certValidity}
              onChange={handleInputChange}
              placeholder="Enter validity period"
              required
            />
          </Form.Item>

          <Form.Item
            label="Type ID"
            required
          >
            <InputNumber
              name="typeId"
              value={formData.typeId}
              onChange={(value) =>
                setFormData({ ...formData, typeId: value ?? 0 })
              }
              placeholder="Enter type ID"
              style={{ width: "100%" }}
              required
            />
          </Form.Item>

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
          <Select
            placeholder="Select Prerequisite certifications"
            onChange={handleSelectCertChange}
            style={{ width: "100%" }}
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
        </Form>
      </Modal>
    </>
  );
};

export default CreateCert;
