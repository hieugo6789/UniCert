import { useState } from "react";
import useJob from "../../hooks/JobPosition/useJobPosition";
import ViewJobPosition from "../../components/JobPosition/ViewJobPosition";
import { Pagination, Table, Tag } from "antd";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import usePermissionJob from "../../hooks/JobPosition/usePermissionJob";
import { useNavigate } from "react-router-dom";

const ManageJobPosition = () => {
  const navigate = useNavigate();
  const { job, loading, refetchJobs } = useJob();
  const { updatePermissionJobDetails } = usePermissionJob();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "jobPositionName", key: "jobPositionName" },
    {
      title: "Major",
      dataIndex: "majorDetails",
      key: "majorDetails",
      render: (majorDetails: any[]) => {
        const approvedMajor = majorDetails
          .filter((major) => major.majorPermission === "Approve")
          .slice(0, 3);
        if (Array.isArray(approvedMajor) && approvedMajor.length > 0) {
          return (
            <>
              {approvedMajor.map((major, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {major.majorCode}
                </Tag>
              ))}
              {majorDetails.filter((ma) => ma.majorPermission === "Approve")
                .length > 3 && <span>...</span>}
            </>
          );
        }
        return <span>No major</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Certification",
      dataIndex: "certificationDetails",
      key: "certificationDetails",
      render: (certificationDetails: any[]) => {
        const approvedCertifications = certificationDetails
          .filter((cert) => cert.permission === "Approve")
          .slice(0, 3);
        if (
          Array.isArray(approvedCertifications) &&
          approvedCertifications.length > 0
        ) {
          return (
            <>
              {approvedCertifications.map((c, index) => (
                <Tag
                  color="green"
                  key={index}
                >
                  {c.certCode}
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
      dataIndex: "jobPositionPermission",
      key: "jobPositionPermission",
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
          <div onClick={(e) => e.stopPropagation()}>
            <ViewJobPosition jobPositionId={record.jobPositionId} />
            <UpdatePermission
              Id={record.jobPositionId}
              refetch={refetchJobs}
              updateFunction={updatePermissionJobDetails}
            />
          </div>
        </>
      ),
    },
  ];
  const paginatedData = job.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className=" gap-4 p-2  h-full">
        <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : job.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="jobPositionId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(`/manager/jobPosition/${record.jobPositionId}`);
                    },
                  };
                }}
                className="header-bg-pink"
              />
            ) : (
              <div>No job positions available.</div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={job.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageJobPosition;
