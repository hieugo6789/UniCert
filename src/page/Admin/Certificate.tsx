import { Button, Input, Pagination, Table, Modal, message, Spin } from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useCertificate from "../../hooks/useCertificate";
import { useState } from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useDeleteCertificate from "../../hooks/useDeleteCertificate";
import useCertDetail from "../../hooks/useCertDetail";

const { confirm } = Modal;

const Certificate = () => {
  const { certificate, loading, refetchCertificates } = useCertificate();
  const { state, getCertDetails } = useCertDetail();
  const [currentPage, setCurrentPage] = useState(1);
  const { handleDeleteCertificate } = useDeleteCertificate();
  const [pageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (certId: string) => {
    setIsModalVisible(true);
    await getCertDetails(certId);
  };

  // const [form] = Form.useForm();

  const handleSearch = () => {
    refetchCertificates(searchTerm);
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "certName", key: "certName" },
    { title: "Code", dataIndex: "certCode", key: "certCode" },
    // { title: "Expire", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleView(record.certId)}
          >
            View
          </Button>
          {/* <EditOutlined onClick={() => handleEdit(record)} /> */}
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.certId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const showDeleteConfirm = (certId: string) => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteCertificate(certId);
        message.success("Account deleted successfully!");
        refetchCertificates();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  // Paginated data
  const paginatedData = certificate.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <div>
            <Input
              placeholder="Search by certification name..."
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
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Certificate
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
            ) : certificate.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="certId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={certificate.length}
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
        ) : state.currentCert ? (
          <div>
            <p>
              <strong>Name</strong> {state.currentCert.certName}
            </p>
            <p>
              <strong>Description</strong> {state.currentCert.certDescription}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default Certificate;
