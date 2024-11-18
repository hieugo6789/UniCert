import { useState } from "react";
import { useCreateOrganize } from "../../hooks/Organization/useCreateOrganize";
import { Modal, Input, Button, Table, Pagination, message, Tag } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import useOrganization from "../../hooks/Organization/useOrganization";
import useDeleteOrganize from "../../hooks/Organization/useDeleteOrganize";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import UpdateOrganize from "../../components/Organization/UpdateOrganize";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import ViewOrganize from "../../components/Organization/ViewOrganize";
import Notification from "../../components/Notification/Notification";

const { confirm } = Modal;

const Organizations = () => {
  const { organization, loading, refetchOrganizations } = useOrganization();
  const { handleDeleteOrganize } = useDeleteOrganize();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const { handleCreateOrganize } = useCreateOrganize();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    organizeName: "",
    organizeAddress: "",
    organizeContact: "",
  });

  const handleSearch = () => {
    setCurrentPage(1);
    refetchOrganizations(searchTerm);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "organizeName", key: "organizeName" },
    { title: "Contact", dataIndex: "organizeContact", key: "organizeContact" },
    { title: "Address", dataIndex: "organizeAddress", key: "organizeAddress" },
    {
      title: "Status",
      dataIndex: "organizePermission",
      key: "organizePermission",
      render: (permission: string) => {
        let color = "";
        switch (permission) {
          case "Approve":
            color = "green";
            break;
          case "Reject":
            color = "red";
            break;
          case "Pending":
            color = "blue";
            break;
          default:
            color = "default";
            break;
        }
        return (
          <Tag
            color={color}
            className="flex justify-center w-16"
          >
            {permission}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <ViewOrganize organizeId={record.organizeId} />
          <UpdateOrganize
            organizeId={record.organizeId}
            refetchOrganizations={refetchOrganizations}
          />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.organizeId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const handleOk = async () => {
    const { organizeName, organizeAddress, organizeContact } = formData;
    if (
      organizeName.trim() &&
      organizeAddress.trim() &&
      organizeContact.trim()
    ) {
      try {
        await handleCreateOrganize(formData);
        refetchOrganizations();
        setIsModalVisible(false);
        setFormData({
          organizeName: "",
          organizeAddress: "",
          organizeContact: "",
        });
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showDeleteConfirm = (organizeId: string) => {
    confirm({
      title: "Are you sure delete this organization?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteOrganize(organizeId);
        message.success("Organization deleted successfully!");
        refetchOrganizations();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };
  const paginatedData = organization.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-full ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full w-1/5">
            <Input
              placeholder="Search "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full pr-10 outline-none"
            />
            <Button
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="absolute right-2 bg-transparent border-none text-gray-500 hover:text-black focus:outline-none"
            />
          </div>
          <div className="ml-10">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={showModal}
            >
              Organization
            </Button>
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2  h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : organization.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="organizeId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
                className="header-bg-pink"
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>

          <Modal
            title="Create Organization"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="OK"
            cancelText="Cancel"
          >
            <Input
              placeholder="Enter organization name"
              name="organizeName"
              value={formData.organizeName}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Enter organization address"
              name="organizeAddress"
              value={formData.organizeAddress}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Enter contact information"
              name="organizeContact"
              value={formData.organizeContact}
              onChange={handleInputChange}
            />
          </Modal>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={organization.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;
