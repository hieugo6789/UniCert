import { useState } from "react";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useExam from "../../hooks/SimulationExam/useExam";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Pagination, Table, Tag } from "antd";
import useDeleteExam from "../../hooks/SimulationExam/useDeleteExam";
import ViewExamDetail from "../../components/Exam/ViewExamDetail";
import UpdateExam from "../../components/Exam/UpdateExam";
import CreateExam from "../../components/Exam/CreateExam";
import Coin from "../../assets/images/Coin.png";

const { confirm } = Modal;

const SimulationExam = () => {
  const { exam, loading, refetchExams } = useExam();
  const { handleDeleteExam } = useDeleteExam();

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
          {fee} <img src={Coin} />
        </span>
      ),
    },
    {
      title: "Discount Fee",
      dataIndex: "examDiscountFee",
      key: "examDiscountFee",
      render: (fee: number) => (
        <span className="text-yellow-600 flex justify-between items-center w-16">
          {fee} <img src={Coin} />
        </span>
      ),
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
          <ViewExamDetail examId={record.examId} />
          <UpdateExam
            examId={record.examId}
            refetchExams={refetchExams}
          />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.examId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];
  const showDeleteConfirm = (examId: number) => {
    confirm({
      title: "Are you sure delete this simulation exam?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteExam(examId);
        message.success("Exam deleted successfully!");
        refetchExams();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center  text-black p-4">
        <div>
          <CreateExam refetchExams={refetchExams} />
        </div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" p-2  min-h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
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
                className="header-bg-pink"
              />
            ) : (
              <div>No simulation exam available.</div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={exam.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SimulationExam;
