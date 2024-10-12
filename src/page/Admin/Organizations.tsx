import { useState } from "react";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { useCreateOrganize } from "../../hooks/useCreateOrganize";
import { Modal, Input, Button, Table, Pagination, Spin } from "antd";
import useOrganization from "../../hooks/useOrganization";
import useOrganizeDetail from "../../hooks/useOrganizeDetail";

const Organizations = () => {
  const { organization, loading, refetchOrganizations } = useOrganization();
  const { state, getOrganizeDetails } = useOrganizeDetail();
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
    { title: "Code", dataIndex: "organizeAddress", key: "organizeAddress" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleView(record.organizeId)}
          >
            View
          </Button>
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
  const paginatedData = organization.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            onClick={showModal}
          >
            + Organization
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
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
            visible={isModalVisible}
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
        title="Certification Details"
        open={isView}
        onCancel={() => setIsView(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentOrganize ? (
          <div>
            <p>
              <strong>Name</strong> {state.currentOrganize.organizeName}
            </p>
            <p>
              <strong>Address</strong> {state.currentOrganize.organizeAddress}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Organizations;
