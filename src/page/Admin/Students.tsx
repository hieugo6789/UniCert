import { ROLE } from "../../constants/role";
import { Table, Tag, Button, Pagination, Modal, Spin } from "antd";
import { useAccounts } from "../../hooks/useAccount";
import { useEffect, useState } from "react";
import Coin from "../../assets/images/Coin.png";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import setUserStatus from "../../hooks/useUserStatus";
import useUserDetail from "../../hooks/useUserDetail";
import useWalletDetail from "../../hooks/useWalletDetail";

const Students = () => {
  const {
    accounts: studentAccounts,
    loading,
    refetch,
  } = useAccounts(ROLE.role4);

  const { wallets, getWalletDetails } = useWalletDetail();
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

      refetch(); // Refresh the list after updating
    } catch (error) {
      console.error("Failed to update the student status.");
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
      width: 200,
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
            danger={record.status}
            onClick={() => handleToggleStatus(record)}
          >
            {record.status ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ),
    },
    {
      title: "Coin",
      key: "coin",
      width: 110,
      render: (record: any) => (
        <div className="flex justify-between items-center ">
          {wallets[record.userId]?.point || 0} <img src={Coin} />
        </div>
      ),
    },
  ];

  // Fetch wallet details when the component mounts or when accounts change
  useEffect(() => {
    studentAccounts.forEach((account) => {
      getWalletDetails(account.userId); // Fetch ví cho từng user
    });
  }, [studentAccounts]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

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
