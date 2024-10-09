import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Pagination,
  Table,
  Spin,
  message,
} from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { useAccounts } from "../../hooks/useAccount";
import useUpdateUserDetail from "../../hooks/useUpdateUserDetail";
import { UpdateRole, UserDetail } from "../../models/user";

const Decentralization = () => {
  const { accounts: managerAccounts, loading, refetch } = useAccounts();
  const { updateUserDetails, state } = useUpdateUserDetail(); // Hook for updating user details
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null); // Track selected user for update

  const [form] = Form.useForm(); // Ant Design Form for editing

  // Table columns definition
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username: string) => <div>{username}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: UserDetail) => (
        <Button
          type="link"
          onClick={() => handleEdit(record)}
        >
          Update
        </Button>
      ),
    },
  ];

  // Handle the pagination change
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginated data
  const paginatedData = managerAccounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle user edit button click
  const handleEdit = (user: UserDetail) => {
    setSelectedUser(user); // Set the selected user for editing
    form.setFieldsValue(user); // Populate the form with current user data
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: UpdateRole) => {
    if (selectedUser) {
      const { userId, ...restSelectedUser } = selectedUser;
      const updatedData: UpdateRole = {
        ...restSelectedUser,
        ...values,
      };

      await updateUserDetails(selectedUser.userId, updatedData);

      if (!state.error) {
        message.success("User updated successfully!");
        setIsModalVisible(false);
        refetch();
      } else {
        message.error(state.error);
      }
    }
  };

  return (
    <>
      <div className="h-[10vh] ">header</div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2 ">
          <MenuAdmin />
        </div>
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="userId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
              />
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={managerAccounts.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>

      {/* Update User Modal */}
      <Modal
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
            onFinish={handleFormSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="PhoneNumber"
              name="phoneNumber"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Fullname"
              name="fullname"
            >
              <Input />
            </Form.Item>
            {/* Add other fields as needed */}
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
      </Modal>
    </>
  );
};

export default Decentralization;
