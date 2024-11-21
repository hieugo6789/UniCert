import { Descriptions, Modal, Spin } from "antd";
import { useState } from "react";
import useUserDetail from "../../hooks/Account/useUserDetail";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { EyeOutlined } from "@ant-design/icons";

interface ViewAccountDetailProps {
  accountId: string;
}
const ViewDetailAccount: React.FC<ViewAccountDetailProps> = ({ accountId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, getUserDetails } = useUserDetail();
  const handleView = async (userId: string) => {
    setIsModalVisible(true);
    await getUserDetails(userId);
  };
  return (
    <>
      <EyeOutlined
        onClick={() => handleView(accountId)}
        style={{ color: "blue", cursor: "pointer" }}
      />
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
export default ViewDetailAccount;
