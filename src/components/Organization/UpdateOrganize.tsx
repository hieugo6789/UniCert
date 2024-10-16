import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useOrganizeDetail from "../../hooks/useOrganizeDetail";
import { Form, Input, message, Modal } from "antd";
import useUpdateOrganize from "../../hooks/useUpdateOrganize";

interface UpdateOrganizeProps {
  organizeId: string;
  refetchOrganizations: () => void;
}

const UpdateOrganize: React.FC<UpdateOrganizeProps> = ({
  organizeId,
  refetchOrganizations,
}) => {
  const [form] = Form.useForm();
  const { updateOrganize, state } = useUpdateOrganize();
  const { state: organizeDetailState, getOrganizeDetails } =
    useOrganizeDetail();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    organizeName: "",
    organizeAddress: "",
    organizeContact: "",
  });
  useEffect(() => {
    if (organizeDetailState.currentOrganize) {
      const currentOrganize = organizeDetailState.currentOrganize;
      setFormData({
        organizeName: currentOrganize.organizeName,
        organizeAddress: currentOrganize.organizeAddress,
        organizeContact: currentOrganize.organizeContact,
      });
      form.setFieldsValue(currentOrganize);
    }
  }, [state.currentOrganize, organizeId, form]);

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      await updateOrganize(organizeId, formData);
      message.success("Organization updated successfully!");
      refetchOrganizations();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update the organization.");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    if (organizeId) {
      getOrganizeDetails(organizeId);
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
        title="Update organization"
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
          initialValues={formData}
        >
          <Form.Item
            label="Name"
            name="organizeName"
            rules={[
              { required: true, message: "Please enter the organization name" },
            ]}
          >
            <Input
              name="organizeName"
              value={formData.organizeName}
              onChange={handleInputChange}
              placeholder="Enter organization name"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="organizeAddress"
            rules={[
              {
                required: true,
                message: "Please enter the organization address",
              },
            ]}
          >
            <Input
              name="organizeAddress"
              value={formData.organizeAddress}
              onChange={handleInputChange}
              placeholder="Enter organization address"
            />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="organizeContact"
            rules={[
              {
                required: true,
                message: "Please enter the organization contact",
              },
            ]}
          >
            <Input
              name="organizeContact"
              value={formData.organizeContact}
              onChange={handleInputChange}
              placeholder="Enter organization contact"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateOrganize;
