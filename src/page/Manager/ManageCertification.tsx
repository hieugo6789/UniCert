import { Button, Input, Pagination, Table, Tag } from "antd";
import ViewCertification from "../../components/Certifications/ViewCertification";
import useCertificate from "../../hooks/Certification/useCertificate";
import { useState } from "react";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import useCertPermission from "../../hooks/Certification/useCertPermission";
import { SearchOutlined } from "@ant-design/icons";

const ManageCertification = () => {
  const { updatePermissionCertDetails } = useCertPermission();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const { certificate, loading, refetchCertificates, metaData } =
    useCertificate({
      searchKeyWord: searchTerm,
      pageNumber: currentPage,
      pageSize: pageSize,
    });
  // Xử lý tìm kiếm
  const handleSearch = () => {
    setCurrentPage(1);
    refetchCertificates(searchTerm, 1, pageSize);
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    refetchCertificates(searchTerm, page, pageSize);
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
              {prerequisites.slice(0, 2).map((prerequisite, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {prerequisite}
                </Tag>
              ))}
              {prerequisites.length > 2 && <span>...</span>}
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
      title: "Status",
      dataIndex: "permission",
      key: "permission",
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
          <ViewCertification certId={record.certId} />
          <UpdatePermission
            Id={record.certId}
            refetch={refetchCertificates}
            searchTerm={searchTerm}
            currentPage={currentPage}
            pageSize={pageSize}
            updateFunction={updatePermissionCertDetails}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center w-1/4 ml-6 absolute"
          style={{ top: "-7%" }}
        >
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

        <div className="gap-4 p-2 h-full">
          <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="h-[76vh]">
              {loading ? (
                <div>Loading...</div>
              ) : certificate.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={certificate}
                  rowKey="certId"
                  pagination={false}
                  loading={loading}
                  rowClassName={() => "h-[8.7vh]"}
                  className="header-bg-pink"
                />
              ) : (
                <div>No certifications available.</div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={metaData.totalRecords}
                onChange={handlePaginationChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageCertification;
