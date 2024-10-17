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
import AvatarAdmin from "../../components/Header/AvatarAdmin";

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
      dataIndex: "certCodePrerequisite",
      key: "certCodePrerequisite",
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

          <UpdateCert
            certId={record.certId}
            refetchCertificates={refetchCertificates}
          />
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

  const paginatedData = certificate.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-full ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full w-1/5">
            <Input
              placeholder="Search"
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
          <CreateCert refetchCertificates={refetchCertificates} />
        </div>

        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
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
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCert ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentCert.certName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentCert.certCode}
            </p>
            <p>
              <strong>Description: </strong>
            </p>
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentCert.certDescription || "",
              }}
            />
            <p>
              <strong>Point system: </strong>{" "}
              {state.currentCert.certPointSystem}
            </p>
            <p>
              <strong>Cost for official exam:</strong>{" "}
              {state.currentCert.certCost} $
            </p>
            <p>
              <strong>Period: </strong> {state.currentCert.certValidity}
            </p>
            <p>
              <strong>Prerequisite certifications: </strong>{" "}
              {state.currentCert.certPrerequisite} -{" "}
              {state.currentCert.certCodePrerequisite}
            </p>
            <p>
              <strong>Organization: </strong> {state.currentCert.organizeName}
            </p>
            <p>
              <strong>Level: </strong> {state.currentCert.typeName}
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
