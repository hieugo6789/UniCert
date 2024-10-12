import { useState } from "react";
import CreateMajor from "../../components/Majors/CreateMajor";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { Input, Button, Table, Pagination, Modal, Spin } from "antd"; // Import Input and Button from antd
import { SearchOutlined } from "@ant-design/icons";
import useMajor from "../../hooks/useMajor";
import useMajorDetail from "../../hooks/useMajorDetail";

const Major = () => {
  const { major, loading, refetchMajors } = useMajor();
  const { state, getMajorDetails } = useMajorDetail();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleSearch = () => {
    refetchMajors(searchTerm);
  };

  const handleView = async (majorId: string) => {
    setIsModalVisible(true);
    await getMajorDetails(majorId);
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "majorName", key: "majorName" },
    { title: "Code", dataIndex: "majorCode", key: "majorCode" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleView(record.majorId)}
          >
            View
          </Button>
          {/* <EditOutlined onClick={() => handleEdit(record)} /> */}
          {/* <DeleteOutlined
            onClick={() => showDeleteConfirm(record.certId)}
            style={{ color: "red", marginLeft: 12 }}
          /> */}
        </>
      ),
    },
  ];

  const paginatedData = major.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="grid grid-cols-12 h-[10vh]">
        <div className="col-span-8">
          <Input
            placeholder="Search by major name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px", padding: "10px", width: "80%" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
          ></Button>
        </div>
        <CreateMajor />
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>

        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : major.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="certId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
              />
            ) : (
              <div>No majors available.</div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={major.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Certification Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentMajor ? (
          <div>
            <p>
              <strong>Name</strong> {state.currentMajor.majorName}
            </p>
            <p>
              <strong>Description</strong> {state.currentMajor.jobPositionId}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Major;
