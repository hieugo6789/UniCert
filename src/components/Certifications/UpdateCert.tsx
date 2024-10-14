import { EditOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Modal, Spin } from "antd";
// import { useState } from "react";
// import useUpdateCert from "../../hooks/useUpdateCert";
const UpdateCert = () => {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const { updateCertDetails, state } = useUpdateCert();
  //   const [form] = Form.useForm();

  //   const handleEdit = ()
  return (
    <>
      <EditOutlined
        style={{ marginLeft: 12 }}
        onClick={() => {}}
      />
      {/* <Modal
        title="Update User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            // onFinish={handleFormSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal> */}
    </>
  );
};
export default UpdateCert;
