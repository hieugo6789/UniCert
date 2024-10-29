import { Button, Input, message, Modal, Pagination, Table, Tag } from "antd";
import useJob from "../../hooks/JobPosition/useJobPosition";
import { useState } from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useDeleteJob from "../../hooks/JobPosition/useDeleteJob";
import CreateJob from "../../components/JobPosition/CreateJob";
import UpdateJobPosition from "../../components/JobPosition/UpdateJobPosition";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import ViewJobPosition from "../../components/JobPosition/ViewJobPosition";

const { confirm } = Modal;

const JobPosition = () => {
  const { job, loading, refetchJobs } = useJob();
  const { handleDeleteJob } = useDeleteJob();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleSearch = () => {
    refetchJobs(searchTerm);
  };

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
        if (Array.isArray(majorDetails) && majorDetails.length > 0) {
          return (
            <>
              {majorDetails.map((major, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {major.majorCode}
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
      dataIndex: "certificationDetails",
      key: "certificationDetails",
      // width: 200,
      render: (certificationDetails: any[]) => {
        if (
          Array.isArray(certificationDetails) &&
          certificationDetails.length > 0
        ) {
          return (
            <>
              {certificationDetails.map((c, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {c.certCode}
                </Tag>
              ))}
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
          <ViewJobPosition jobPositionId={record.jobPositionId} />
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
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-full ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full w-1/5">
            <Input
              placeholder="Search by job name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full pr-10 outline-none"
            />
            <Button
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="absolute right-2 bg-transparent border-none text-gray-500 hover:text-black focus:outline-none"
            />
          </div>
          <div className="ml-10">
            <CreateJob refetchJobPositions={refetchJobs} />
          </div>
        </div>
        <div className="mr-10">
          <AvatarAdmin />
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
    </>
  );
};
export default JobPosition;
