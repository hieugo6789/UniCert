import { Button, message, Modal, Pagination, Spin, Table } from "antd";
import useJob from "../../hooks/useJobPosition";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useJobDetail from "../../hooks/useJobDetail";
import { useState } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import useDeleteJob from "../../hooks/useDeleteJob";

const { confirm } = Modal;

const JobPosition = () => {
  const { job, loading, refetchJobs } = useJob();
  const { state, getJobDetails } = useJobDetail();
  const { handleDeleteJob } = useDeleteJob();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (jobPositionId: string) => {
    setIsModalVisible(true);
    await getJobDetails(jobPositionId);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "jobPositionName", key: "jobPositionName" },
    { title: "Code", dataIndex: "jobPositionCode", key: "jobPositionCode" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => handleView(record.jobPositionId)}
          >
            View
          </Button>
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.jobPositionId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];
  const showDeleteConfirm = (jobPositionId: string) => {
    confirm({
      title: "Are you sure delete this job position?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteJob(jobPositionId);
        message.success("Job deleted successfully!");
        refetchJobs();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  const paginatedData = job.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Job position
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>{" "}
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
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
              />
            ) : (
              <div>No organizations available.</div>
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
      <Modal
        title="Certification Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentJob ? (
          <div>
            <p>
              <strong>Name</strong> {state.currentJob.jobPositionName}
            </p>
            <p>
              <strong>Description</strong>{" "}
              {state.currentJob.jobPositionDescription}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};
export default JobPosition;
