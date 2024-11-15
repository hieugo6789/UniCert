import { useState } from "react";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useExam from "../../hooks/SimulationExam/useExam";
import { Pagination, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";

const Feedback = () => {
  const navigate = useNavigate();
  const { exam, loading } = useExam();
  const [pageSize] = useState(9);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowClick = (record: any) => {
    navigate(`/admin/feedback/exam/${record.examId}`);
  };
  const columns = [
    {
      title: "ID",
      key: "examName",
      render: (record: any) => <div>EID-{record.examId}</div>,
    },
    { title: "Exam Name", dataIndex: "examName", key: "examName" },
    {
      title: "Exam code",
      key: "examCode",
      render: (record: any) => (
        <Tag
          className="flex items-center w-fit"
          color="blue"
        >
          <div className="ml-1">{record.examCode}</div>
        </Tag>
      ),
    },
    {
      title: "Feedback",
      key: "feedbackCount",
      render: (record: any) => (
        <Tag
          className="flex items-center w-fit"
          color="green"
        >
          <FiMessageCircle />
          <div className="ml-1">{record.feedbackCount}</div>
        </Tag>
      ),
    },
  ];
  const paginatedData = exam.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="h-[9vh] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold ml-6">Feedback Management</h2>
        </div>
        <div className="mr-10 flex items-center">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" p-2  min-h-[91vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : exam.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="examId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[7.7vh] cursor-pointer"}
                className="header-bg-pink"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
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
export default Feedback;
