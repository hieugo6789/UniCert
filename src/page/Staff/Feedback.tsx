import { useState } from "react";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useExam from "../../hooks/SimulationExam/useExam";
import { Pagination, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { exam, loading } = useExam();
  const [pageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowClick = (record: any) => {
    navigate(`/staff/feedback/exam/${record.examId}`);
  };
  const columns = [
    { title: "Name", dataIndex: "examName", key: "examName" },
    { title: "Feedback", dataIndex: "feedbackCount", key: "feedbackCount" },
  ];
  const paginatedData = exam.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4 ml-6">
            Feedback Management
          </h2>
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
                rowKey="examId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[7.3vh] cursor-pointer"}
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
