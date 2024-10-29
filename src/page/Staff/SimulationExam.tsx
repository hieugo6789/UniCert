import { useState } from "react";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useExam from "../../hooks/SimulationExam/useExam";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Pagination, Table, Tag } from "antd";
import useDeleteExam from "../../hooks/SimulationExam/useDeleteExam";

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
      render: (fee: number) => <span className="text-green-600">${fee}</span>,
    },
    {
      title: "Discount Fee",
      dataIndex: "examDiscountFee",
      key: "examDiscountFee",
      render: (fee: number) => <span className="text-green-600">${fee}</span>,
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
        return <span>No cert</span>;
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
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
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
        <div className="text-2xl font-semibold">Exam Management</div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" p-2 bg-slate-100 min-h-[90vh]">
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
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SimulationExam;
