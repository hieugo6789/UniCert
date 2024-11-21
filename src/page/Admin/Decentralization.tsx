import { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Pagination,
  Table,
  Spin,
  message,
  Tag,
  Select,
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
import AdminNotification from "../../components/Notification/AdminNotification";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { ROLE } from "../../constants/role";
import CreateAccount from "../../components/Account/CreateAccount";
import ViewDetailAccount from "../../components/Account/ViewDetailAccount";

const { confirm } = Modal;

const Decentralization = () => {
  const {
    accounts: managerAccounts,
    loading,
    refetch,
  } = useAccounts(ROLE.role2, ROLE.role3);
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
      render: (username: string, record: any) => (
        <div className="flex items-center">
          <img
            src={record.userImage || defaultAvatar}
            alt={record.fullname}
            className=" rounded-full size-12 mr-2"
          />
          {username}
        </div>
      ),
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
        return (
          <div
            className={
              "px-3 py-1 rounded-lg flex justify-center max-w-20 bg-blue-500 text-white "
            }
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
          <ViewDetailAccount accountId={record.userId} />
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ marginLeft: 12 }}
          />
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
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
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
      <div className="h-[9vh] flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold ml-6">Account</h2>
          <div className="ml-4">
            <CreateAccount refetch={refetch} />
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <AdminNotification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 h-[91vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
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
                rowClassName={() => "h-[8.7vh] custom-row-style"}
                className="header-bg-pink"
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

      <Modal
        title="Update Role Employee"
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
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select a role!",
                },
              ]}
            >
              <Select placeholder="Select role">
                <Select.Option value="Staff">Staff</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
              </Select>
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
