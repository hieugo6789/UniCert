import { useState } from "react";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useExam from "../../hooks/SimulationExam/useExam";
import { Pagination, Table } from "antd";

const SimulationExam = () => {
  // const { exam, loading, refetchExams } = useExam();
  const { exam, loading } = useExam();

  const [pageSize] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = exam.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [{ title: "Name", dataIndex: "examName", key: "examName" }];
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
