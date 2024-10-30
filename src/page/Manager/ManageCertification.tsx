import { Pagination, Table, Tag } from "antd";
import ViewCertification from "../../components/Certifications/ViewCertification";
import useCertificate from "../../hooks/Certification/useCertificate";
import { useState } from "react";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import useCertPermission from "../../hooks/Certification/useCertPermission";

const ManageCertification = () => {
  const { certificate, loading, refetchCertificates } = useCertificate();
  const { updatePermissionCertDetails } = useCertPermission();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
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
                </Tag>
              ))}
            </>
          );
        }
        return <span>No prerequisites</span>;
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
            updateFunction={updatePermissionCertDetails}
          />
        </>
      ),
    },
  ];

  const paginatedData = certificate.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="gap-4 p-2 bg-gradient-to-r from-indigo-50 to-indigo-100 h-full">
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
    </>
  );
};
export default ManageCertification;
