import {
  Button,
  Input,
  Pagination,
  Table,
  Modal,
  message,
  Spin,
  Tag,
} from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useCertificate from "../../hooks/useCertificate";
import { useState } from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useDeleteCertificate from "../../hooks/useDeleteCertificate";
import useCertDetail from "../../hooks/useCertDetail";
import CreateCert from "../../components/Certifications/CreateCert";
import UpdateCert from "../../components/Certifications/UpdateCert";

const { confirm } = Modal;

const Certificate = () => {
  const { certificate, loading, refetchCertificates } = useCertificate();
  const { state, getCertDetails } = useCertDetail();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const { handleDeleteCertificate } = useDeleteCertificate();
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
    { title: "Period", dataIndex: "certValidity", key: "certValidity" },
    {
      title: "Prerequisite",
      dataIndex: "certPrerequisite",
      key: "certPrerequisite",
      render: (prerequisites: string[]) => {
        if (Array.isArray(prerequisites) && prerequisites.length > 0) {
          return (
            <>
              {prerequisites.map((prerequisite, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {prerequisite}
                </Tag> // Wrap each prerequisite in a Tag
              ))}
            </>
          );
        }
        return <span>No prerequisites</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Organization",
      dataIndex: "organizeName",
      key: "organizeName",
    },
    {
      title: "Level",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <EyeOutlined
            onClick={() => handleView(record.certId)}
            style={{ color: "blue" }}
          />

          <UpdateCert />
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
      title: "Are you sure delete this certification?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteCertificate(certId);
        message.success("Certification deleted successfully!");
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
          <CreateCert />
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
              <div>No certifications available.</div>
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
