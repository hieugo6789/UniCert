import { Pagination, Table, Tag } from "antd";
import { useState } from "react";
import useExam from "../../hooks/SimulationExam/useExam";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import usePermissionExam from "../../hooks/SimulationExam/usePermissionExam";
import Coin from "../../assets/images/Coin.png";
import ViewExamDetail from "../../components/Exam/ViewExamDetail";
// import UpdateVoucherExam from "../../components/Voucher/UpdateVoucherExam";
import { useNavigate } from "react-router-dom";

const ManageExam = () => {
  const navigate = useNavigate();
  const { exam, loading, refetchExams } = useExam();
  const { updatePermissionExamDetails } = usePermissionExam();
  const [pageSize] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = exam.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const columns = [
    { title: "Name", dataIndex: "examName", key: "examName" },
    {
      title: "Exam Fee",
      dataIndex: "examFee",
      key: "examFee",
      render: (fee: number) => (
        <span className="text-yellow-600 flex justify-between items-center w-16">
          {fee}{" "}
          <img
            src={Coin}
            className="size-7"
          />
        </span>
      ),
    },
    // {
    //   title: "Discount Fee",
    //   dataIndex: "examDiscountFee",
    //   key: "examDiscountFee",
    //   render: (fee: number) => (
    //     <span className="text-yellow-600 flex justify-between items-center w-16">
    //       {fee}{" "}
    //       <img
    //         src={Coin}
    //         className="size-7"
    //       />
    //     </span>
    //   ),
    // },
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
              {approvedCertifications.map((cert, index) => (
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
        return <span>Cert pending</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Status",
      dataIndex: "examPermission",
      key: "examPermission",
      render: (permission: string) => {
        let color = "";
        switch (permission) {
          case "Approve":
            color = "green"; // Green for approved
            break;
          case "Reject":
            color = "red"; // Red for rejected
            break;
          case "Pending":
            color = "blue"; // Blue for pending
            break;
          default:
            color = "default"; // Default color for unexpected status
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
            <div className="flex">
              <ViewExamDetail examId={record.examId} />
              <UpdatePermission
                Id={record.examId}
                refetch={refetchExams}
                updateFunction={updatePermissionExamDetails}
              />
              {/* <UpdateVoucherExam
                examId={record.examId}
                refetchExams={refetchExams}
              /> */}
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className=" p-2  h-full">
        <div className=" bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : exam.length > 0 ? (
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
                      navigate(`/manager/simulationExam/${record.examId}`);
                    },
                  };
                }}
                className="header-bg-pink"
              />
            ) : (
              <div>No organizations available.</div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={exam.length}
              onChange={handlePaginationChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageExam;
