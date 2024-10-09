import { ROLE } from "../../constants/role";
import { Table, Tag, Button, Pagination, Modal, Spin } from "antd";
import { useAccounts } from "../../hooks/useAccount";
import { useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import setUserStatus from "../../hooks/useUserStatus";
import useUserDetail from "../../hooks/useUserDetail";
// import './Students.css'; // Assuming you add custom styling here

const Students = () => {
  const {
    accounts: studentAccounts,
    loading,
    refetch,
  } = useAccounts(ROLE.role4);

  const { state, getUserDetails } = useUserDetail();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (userId: string) => {
    setIsModalVisible(true);
    await getUserDetails(userId);
  };

  const handleToggleStatus = async (record: any) => {
    try {
      const updatedStatus = !record.status; // Toggle the current status
      console.log(record.userId);

      await setUserStatus(record.userId, updatedStatus);

      // Show success message
      // message.success(
      //   `Student ${record.username} has been ${updatedStatus ? "activated" : "deactivated"}.`
      // );

      // You can refresh the list or update the local state after successful update
      refetch();
    } catch (error) {
      // message.error("Failed to update the student status.");
    }
  };

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
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div>
          <Button
            type="link"
            onClick={() => handleView(record.userId)}
          >
            View
          </Button>
          <Button
            type="link"
            danger={record.status} // Render button in red if status is active
            onClick={() => handleToggleStatus(record)}
          >
            {record.status ? "Deactivate" : "Activate"}{" "}
          </Button>
        </div>
      ),
    },
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      render: (coin: number) => (
        <div>
          {coin} <DollarOutlined />
        </div>
      ),
    },
  ];

  // Handle Pagination change
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginated data
  const paginatedData = studentAccounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="h-[10vh] ">header</div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2 ">
          <MenuAdmin />
        </div>
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg   ">
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
              total={studentAccounts.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentUser ? (
          <div>
            <p>
              <strong>Username:</strong> {state.currentUser.username}
            </p>
            <p>
              <strong>Email:</strong> {state.currentUser.email}
            </p>
            <p>
              <strong>PhoneNumber:</strong> {state.currentUser.phoneNumber}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Students;
