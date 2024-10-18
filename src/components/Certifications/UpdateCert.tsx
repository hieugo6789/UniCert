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
      // const certPrerequisiteIds = Array.isArray(currentCert.certPrerequisiteId)
      // ? currentCert.certPrerequisiteId.map((job) => job.jobPositionId)
      // : [];
      form.setFieldsValue({
        certName: currentCert.certName || "",
        certCode: currentCert.certCode || "",
        certDescription: currentCert.certDescription || "",
        certCost: currentCert.certCost || "",
        certPointSystem: currentCert.certPointSystem || "",
        certImage: currentCert.certImage || "",
        certValidity: currentCert.certValidity || "",
        typeId: currentCert.typeId || "",
        organizeId: currentCert.organizeId || "",
        certIdPrerequisites: currentCert.certPrerequisiteId || [],
      });
      // form.setFieldsValue(currentCert);
    }
  }, [state.currentCert, certId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      await updateCertDetails(certId, formData);
      message.success("Certificate updated successfully!");
      refetchCertificates();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the certificate.");
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
            rules={[
              { required: true, message: "Please enter the certificate cost" },
            ]}
          >
            <InputNumber
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
            <Input placeholder="Enter point system" />
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
            <Input placeholder="Enter certificate image URL" />
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCert;
