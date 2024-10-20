import { ROLE } from "../../constants/role";
import {
  Table,
  Tag,
  Button,
  Pagination,
  Modal,
  Spin,
  Descriptions,
} from "antd";
import { useAccounts } from "../../hooks/Account/useAccount";
import { useEffect, useState } from "react";
import Coin from "../../assets/images/Coin.png";
import setUserStatus from "../../hooks/Account/useUserStatus";
import useUserDetail from "../../hooks/Account/useUserDetail";
import useWalletDetail from "../../hooks/useWalletDetail";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import AvatarAdmin from "../../components/Header/AvatarAdmin";

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
      <div className="h-[10vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
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
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentUser ? (
          <div className="flex flex-col items-center  w-full">
            <div className="w-full border-b border-gray-400 pb-6 mb-4 flex flex-col items-center">
              <img
                className="rounded-full w-48 h-48"
                src={
                  state.currentUser.userImage
                    ? state.currentUser.userImage
                    : defaultAvatar
                }
                alt="User Avatar"
              />
            </div>
            <div>
              <Descriptions
                bordered
                size="middle"
                column={1}
                className="mb-4"
                labelStyle={{ width: "180px", fontWeight: "bold" }} // Cố định độ dài label
                contentStyle={{ width: "500px", textAlign: "left" }}
              >
                <Descriptions.Item label="Username">
                  <span>{state.currentUser.username}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <span>{state.currentUser.email}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Full name">
                  <span>{state.currentUser.fullname}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Date of birth">
                  <span>
                    {new Date(state.currentUser.dob).toLocaleDateString()}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  <span>{state.currentUser.phoneNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Created at">
                  <span>
                    {new Date(
                      state.currentUser.userCreatedAt
                    ).toLocaleDateString()}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  <span>{state.currentUser.address}</span>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Students;
