import { Pagination, Table, Tag } from "antd";
import useMajor from "../../hooks/Major/useMajor";
import { useState } from "react";
import ViewMajorDetail from "../../components/Majors/ViewMajorDetail";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import usePermissionMajor from "../../hooks/Major/usePermissionMajor";

const ManageMajor = () => {
  const { major, loading, refetchMajors } = useMajor();
  const { updatePermissionMajorDetails } = usePermissionMajor();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginatedData = major.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const columns = [
    { title: "Name", dataIndex: "majorName", key: "majorName" },
    {
      title: "Job Position",
      dataIndex: "jobPositionDetails",
      key: "jobPositionDetails",
      render: (jobPositionDetails: any[]) => {
        const jobApproved = jobPositionDetails
          .filter((job) => job.jobPositionPermission === "Approve")
          .slice(0, 3);
        if (Array.isArray(jobApproved) && jobApproved.length > 0) {
          return (
            <>
              {jobApproved.map((job, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {job.jobPositionCode}
                </Tag>
              ))}
              {jobPositionDetails.filter(
                (job) => job.jobPositionPermission === "Approve"
              ).length > 3 && <span>...</span>}
            </>
          );
        }
        return <span>No job</span>;
      },
    },
    {
      title: "Certification",
      dataIndex: "certificationDetails",
      key: "certificationDetails",
      render: (certificationDetails: any[]) => {
        const approvedCerts = certificationDetails
          .filter((cert) => cert.permission === "Approve")
          .slice(0, 3);
        if (Array.isArray(approvedCerts) && approvedCerts.length > 0) {
          return (
            <>
              {approvedCerts.map((cert, index) => (
                <Tag
                  color="green"
                  key={index}
                >
                  {cert.certCode}
                </Tag>
              ))}
              {certificationDetails.filter(
                (cert) => cert.permission === "Approve"
              ).length > 3 && <span>...</span>}
            </>
          );
        }
        return <span>No certification</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "majorPermission",
      key: "majorPermission",
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
          <ViewMajorDetail majorId={record.majorId} />
          <UpdatePermission
            Id={record.majorId}
            refetch={refetchMajors}
            updateFunction={updatePermissionMajorDetails}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <div className=" gap-4 p-2  h-full">
        <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : major.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="majorId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
                className="header-bg-pink"
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
    </>
  );
};
export default ManageMajor;
