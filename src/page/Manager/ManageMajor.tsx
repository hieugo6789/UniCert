import { Pagination, Table, Tag } from "antd";
import useMajor from "../../hooks/Major/useMajor";
import { useState } from "react";
import UpdatePermissionMajor from "../../components/Majors/UpdatePermissionMajor";

const ManageMajor = () => {
  const { major, loading, refetchMajors } = useMajor();
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
        if (
          Array.isArray(jobPositionDetails) &&
          jobPositionDetails.length > 0
        ) {
          return (
            <>
              {jobPositionDetails.map((job, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {job.jobPositionCode}
                </Tag>
              ))}
            </>
          );
        }
        return <span>No job</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Certification",
      dataIndex: "certificationDetails",
      key: "certificationDetails",
      render: (certificationDetails: any[]) => {
        if (
          Array.isArray(certificationDetails) &&
          certificationDetails.length > 0
        ) {
          return (
            <>
              {certificationDetails.map((cert, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {cert.certCode}
                </Tag>
              ))}
            </>
          );
        }
        return <span>No cert</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Status",
      dataIndex: "majorPermission",
      key: "majorPermission",
    },

    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <UpdatePermissionMajor
            majorId={record.majorId}
            refetchMajors={refetchMajors}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
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
