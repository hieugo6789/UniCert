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
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const JobPosition = () => {
  const navigate = useNavigate();
  const { job, loading, refetchJobs } = useJob();
  const { handleDeleteJob } = useDeleteJob();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleSearch = () => {
    setCurrentPage(1);
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
        const approvedMajor = majorDetails
          .filter((major) => major.majorPermission === "Approve")
          .slice(0, 3);
        if (Array.isArray(approvedMajor) && approvedMajor.length > 0) {
          return (
            <>
              {approvedMajor.map((major, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {major.majorCode}
                </Tag>
              ))}
              {majorDetails.filter((ma) => ma.majorPermission === "Approve")
                .length > 3 && <span>...</span>}
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
              {approvedCertifications.map((c, index) => (
                <Tag
                  color="green"
                  key={index}
                >
                  {c.certCode}
                </Tag>
              ))}
              {certificationDetails.filter(
                (cert) => cert.permission === "Approve"
              ).length > 3 && <span>...</span>}
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
          <div onClick={(e) => e.stopPropagation()}>
            <ViewJobPosition jobPositionId={record.jobPositionId} />
            <UpdateJobPosition
              jobPositionId={record.jobPositionId}
              refetchJobs={refetchJobs}
            />
            <DeleteOutlined
              onClick={() => showDeleteConfirm(record.jobPositionId)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </div>
        </>
      ),
    },
  ];
  const showDeleteConfirm = (jobPositionId: string) => {
    confirm({
      title: "Are you sure delete this job position?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
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
      <div className="h-[10vh] flex justify-between items-center ">
        <div className="flex items-center w-fit ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full">
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
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2  h-[90vh]">
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
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(`/staff/jobPosition/${record.jobPositionId}`);
                    },
                  };
                }}
                className="header-bg-pink"
              />
            ) : (
              <div>No job positions available.</div>
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
