import { message, Modal, Pagination, Spin, Table, Tag } from "antd";
import useJob from "../../hooks/useJobPosition";
import useJobDetail from "../../hooks/useJobDetail";
import { useState } from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useDeleteJob from "../../hooks/useDeleteJob";
import CreateJob from "../../components/JobPosition/CreateJob";
import UpdateJobPosition from "../../components/JobPosition/UpdateJobPosition";

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
    {
      title: "Major",
      dataIndex: "majorCode",
      key: "majorCode",
      render: (major: string[]) => {
        if (Array.isArray(major) && major.length > 0) {
          return (
            <>
              {major.map((m, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {m}
                </Tag> // Wrap each prerequisite in a Tag
              ))}
            </>
          );
        }
        return <span>No major</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Certification",
      dataIndex: "certCode",
      key: "certCode",
      // width: 200,
      render: (certification: string[]) => {
        if (Array.isArray(certification) && certification.length > 0) {
          return (
            <>
              {certification.map((c, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {c}
                </Tag>
              ))}
            </>
          );
        }
        return <span>No certification</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <EyeOutlined
            style={{ color: "blue" }}
            onClick={() => handleView(record.jobPositionId)}
          />
          <UpdateJobPosition
            jobPositionId={record.jobPositionId}
            refetchJobs={refetchJobs}
          />
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
          <CreateJob refetchJobPositions={refetchJobs} />
        </div>
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
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
        width={900}
        title="Certification Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentJob ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentJob.jobPositionName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentJob.jobPositionCode}
            </p>
            <strong>Description: </strong>{" "}
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentJob.jobPositionDescription || "",
              }}
            />
            <p>
              <strong>Major: </strong> {state.currentJob.majorName} -{" "}
              {state.currentJob.majorCode}
            </p>
            <p>
              <strong>Certification: </strong> {state.currentJob.certName} -{" "}
              {state.currentJob.certCode}
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
