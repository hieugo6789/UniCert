import { useState } from "react";
import CreateMajor from "../../components/Majors/CreateMajor";
import {
  Input,
  Button,
  Table,
  Pagination,
  Modal,
  Spin,
  message,
  Tag,
} from "antd"; // Import Input and Button from antd
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useMajor from "../../hooks/useMajor";
import useMajorDetail from "../../hooks/useMajorDetail";
import useDeleteMajor from "../../hooks/useDeleteMajor";
import UpdateMajor from "../../components/Majors/UpdateMajor";
import AvatarAdmin from "../../components/Header/AvatarAdmin";

const { confirm } = Modal;

const Major = () => {
  const { major, loading, refetchMajors } = useMajor();
  const { state, getMajorDetails } = useMajorDetail();
  const { handleDeleteMajor } = useDeleteMajor();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const handleSearch = () => {
    refetchMajors(searchTerm);
  };

  const handleView = async (majorId: string) => {
    setIsModalVisible(true);
    await getMajorDetails(majorId);
  };
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: "Name", dataIndex: "majorName", key: "majorName" },
    {
      title: "Job Position",
      dataIndex: "jobPositionDetails",
      key: "jobPositionDetails",
      render: (jobPositionDetails: any[]) => {
        if (
          Array.isArray(jobPositionDetails) &&
          jobPositionDetails.length > 0
        ) {
          return (
            <>
              {jobPositionDetails.map((job, index) => (
                <Tag
                  color="blue"
                  key={index}
                >
                  {job.jobPositionCode}
                </Tag>
              ))}
            </>
          );
        }
        return <span>No job</span>; // Fallback for empty or non-array
      },
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
        return <span>No cert</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <EyeOutlined
            style={{ color: "blue" }}
            onClick={() => handleView(record.majorId)}
          />
          <UpdateMajor
            majorId={record.majorId}
            refetchMajors={refetchMajors}
          />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.majorId)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const showDeleteConfirm = (majorId: string) => {
    confirm({
      title: "Are you sure delete this major?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
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
        <div className="flex items-center w-full ml-10">
          <div className="relative flex items-center border-2 border-transparent focus-within:border-blue-500 rounded-full w-1/5">
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
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>

      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
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

      <Modal
        title="Major Details"
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentMajor ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentMajor.majorName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentMajor.majorCode}
            </p>
            <strong>Description: </strong>
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentMajor.majorDescription || "",
              }}
            />
            <p>
              <strong>Job position: </strong>
              {state.currentMajor.jobPositionDetails?.map((job, index) => (
                <Tag key={index}>
                  {job.jobPositionCode} - {job.jobPositionName}
                </Tag>
              )) || "No job positions available"}
            </p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Major;
