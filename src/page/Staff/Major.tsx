import { useState } from "react";
import CreateMajor from "../../components/Majors/CreateMajor";
import { Input, Button, Table, Pagination, Modal, message, Tag } from "antd"; // Import Input and Button from antd
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useMajor from "../../hooks/Major/useMajor";
import useDeleteMajor from "../../hooks/Major/useDeleteMajor";
import UpdateMajor from "../../components/Majors/UpdateMajor";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import ViewMajorDetail from "../../components/Majors/ViewMajorDetail";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Major = () => {
  const navigate = useNavigate();
  const { major, loading, refetchMajors } = useMajor();
  const { handleDeleteMajor } = useDeleteMajor();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleSearch = () => {
    refetchMajors(searchTerm);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(1);
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "majorName", key: "majorName" },
    {
      title: "Job Position",
      dataIndex: "jobPositionDetails",
      key: "jobPositionDetails",
      render: (jobPositionDetails: any[]) => {
        const jobApproved = jobPositionDetails
          .filter((job) => job.jobPositionPermission === "Approve")
          .slice(0, 3);
        if (Array.isArray(jobApproved) && jobApproved.length > 0) {
          return (
            <>
              {jobApproved.map((job, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {job.jobPositionCode}
                </Tag>
              ))}
              {jobPositionDetails.filter(
                (job) => job.jobPositionPermission === "Approve"
              ).length > 3 && <span>...</span>}
            </>
          );
        }
        return <span>No job</span>;
      },
    },
    {
      title: "Certification",
      dataIndex: "certificationDetails",
      key: "certificationDetails",
      render: (certificationDetails: any[]) => {
        const approvedCerts = certificationDetails
          .filter((cert) => cert.permission === "Approve")
          .slice(0, 3);
        if (Array.isArray(approvedCerts) && approvedCerts.length > 0) {
          return (
            <>
              {approvedCerts.map((cert, index) => (
                <Tag
                  color="green"
                  key={index}
                >
                  {cert.certCode}
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
      dataIndex: "majorPermission",
      key: "majorPermission",
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
            <ViewMajorDetail majorId={record.majorId} />
            <UpdateMajor
              majorId={record.majorId}
              refetchMajors={refetchMajors}
            />
            <DeleteOutlined
              onClick={() => showDeleteConfirm(record.majorId)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </div>
        </>
      ),
    },
  ];

  const showDeleteConfirm = (majorId: string) => {
    confirm({
      title: "Are you sure delete this major?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteMajor(majorId);
        message.success("major deleted successfully!");
        refetchMajors();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  const paginatedData = major.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="flex items-center w-fit ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full">
            <Input
              placeholder="Search by major name..."
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
            <CreateMajor refetchMajors={refetchMajors} />
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>

      <div className=" gap-4 p-2 h-[90vh]">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <div className="h-[76vh]">
            {loading ? (
              <div>Loading...</div>
            ) : major.length > 0 ? (
              <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="majorId"
                pagination={false}
                loading={loading}
                rowClassName={() => "h-[8.7vh]"}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(`/staff/major/${record.majorId}`);
                    },
                  };
                }}
                className="header-bg-pink"
              />
            ) : (
              <div>No majors available.</div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={major.length}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Major;
