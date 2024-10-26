import { useState } from "react";
import { useCreateOrganize } from "../../hooks/Organization/useCreateOrganize";
import { Modal, Input, Button, Table, Pagination, Spin, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import useOrganization from "../../hooks/Organization/useOrganization";
import useOrganizeDetail from "../../hooks/Organization/useOrganizeDetail";
import useDeleteOrganize from "../../hooks/Organization/useDeleteOrganize";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Descriptions } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import UpdateOrganize from "../../components/Organization/UpdateOrganize";
import AvatarAdmin from "../../components/Header/AvatarAdmin";

const { confirm } = Modal;

const Organizations = () => {
  const { organization, loading, refetchOrganizations } = useOrganization();
  const { state, getOrganizeDetails } = useOrganizeDetail();
  const { handleDeleteOrganize } = useDeleteOrganize();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const { handleCreateOrganize } = useCreateOrganize();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState({
    organizeName: "",
    organizeAddress: "",
    organizeContact: "",
  });

  const handleSearch = () => {
    refetchOrganizations(searchTerm);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleView = async (organizeId: string) => {
    setIsView(true);
    await getOrganizeDetails(organizeId);
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "organizeName", key: "organizeName" },
    { title: "Contact", dataIndex: "organizeContact", key: "organizeContact" },
    { title: "Address", dataIndex: "organizeAddress", key: "organizeAddress" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <EyeOutlined
            style={{ color: "blue" }}
            onClick={() => handleView(record.organizeId)}
          />
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
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
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
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 bg-slate-100 h-[90vh]">
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
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>

          <Modal
            title="Tạo Organization"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="OK"
            cancelText="Cancel"
          >
            <Input
              placeholder="Nhập tên tổ chức"
              name="organizeName"
              value={formData.organizeName}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Nhập địa chỉ tổ chức"
              name="organizeAddress"
              value={formData.organizeAddress}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Nhập thông tin liên lạc"
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
      <Modal
        width={800}
        footer={null}
        open={isView}
        onCancel={() => setIsView(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentOrganize ? (
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "150px", fontWeight: "bold" }} // Cố định độ dài label
              contentStyle={{ width: "300px", textAlign: "left" }}
              title={
                <h3 className="text-2xl text-blue-600">Organization Details</h3>
              }
            >
              <Descriptions.Item label="Name">
                <span className="text-blue-700">
                  {state.currentOrganize.organizeName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Contact">
                <span className="text-gray-600">
                  {state.currentOrganize.organizeContact}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined />{" "}
                <span className="text-gray-600">
                  {state.currentOrganize.organizeAddress}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Organizations;
