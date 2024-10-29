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
  Tag,
} from "antd";
import { useAccounts } from "../../hooks/Account/useAccount";
import useUpdateUserDetail from "../../hooks/Account/useUpdateUserDetail";
import { UpdateRole, UserDetail } from "../../models/user";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useDeleteAccount from "../../hooks/Account/useDeleteAccount";
import AvatarAdmin from "../../components/Header/AvatarAdmin";

const { confirm } = Modal;

const Decentralization = () => {
  const { accounts: managerAccounts, loading, refetch } = useAccounts();
  const { updateUserDetails, state } = useUpdateUserDetail();
  const { handleDeleteAccount } = useDeleteAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
      render: (phoneNumber: string) => (
        <span className="text-blue-500 underline">{phoneNumber}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const roleStyles: { [key: string]: string } = {
          Manager: "bg-purple-500 text-white",
          Student: "bg-blue-500 text-white",
          Staff: "bg-gray-400 text-white",
          Admin: "bg-green-400 text-white",
        };
        return (
          <div
            className={`px-3 py-1 rounded-lg flex justify-center max-w-20 ${
              roleStyles[role] || "bg-gray-200 text-black"
            }`}
          >
            {role}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: UserDetail) => (
        <>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.userId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  // Confirm delete action
  const showDeleteConfirm = (userId: string) => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteAccount(userId);
        message.success("Account deleted successfully!");
        refetch();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  // Handle the pagination change
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginated data
  const paginatedData = managerAccounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEdit = (user: UserDetail) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
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
      <div className="h-[10vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
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
          <div className="mt-6 flex justify-end">
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
              label="Fullname"
              name="fullname"
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
              label="Image URL"
              name="userImage"
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
      </Modal>
    </>
  );
};

export default Decentralization;
