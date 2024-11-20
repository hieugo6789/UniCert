import { message, Modal, Table, Tag } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useCourse from "../../hooks/Course/useCourse";
import { allCoursePaginationData } from "../../models/course";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import useDeleteCourse from "../../hooks/Course/useDeleteCourse";
import UpdateCourse from "../../components/Course/UpdateCourse";
import CreateCourse from "../../components/Course/CreateCourse";
import ViewDetailCourse from "../../components/Course/ViewDetailCourse";
import Coin from "../../assets/images/Coin.png";
import Notification from "../../components/Notification/Notification";
import { Link } from "react-router-dom";
const { confirm } = Modal;

const InternalCourses = () => {
  const { course, loading, refetchCourses } = useCourse();
  const { handleDeleteCourse } = useDeleteCourse();

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text: string) => <span className="">{text}</span>, // Custom color for course name
    },
    {
      title: "Course Time",
      dataIndex: "courseTime",
      key: "courseTime",
      render: (text: string) => <span className="text-teal-500">{text}</span>,
    },
    {
      title: "Course Fee",
      dataIndex: "courseFee",
      key: "courseFee",
      render: (fee: number) => (
        <span className="text-yellow-600 flex justify-between items-center w-16">
          {fee}{" "}
          <img
            src={Coin}
            className="size-7"
          />
        </span>
      ),
    },
    {
      title: "Discount Fee",
      dataIndex: "courseDiscountFee",
      key: "courseDiscountFee",
      render: (fee: number) => (
        <span className="text-yellow-600 flex justify-between items-center w-16">
          {fee}{" "}
          <img
            src={Coin}
            className="size-7"
          />
        </span>
      ),
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
              {approvedCertifications.map((cert, index) => (
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
        return <span>Cert pending</span>; // Fallback for empty or non-array
      },
    },
    {
      title: "Status",
      dataIndex: "coursePermission",
      key: "coursePermission",
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
      render: (record: allCoursePaginationData) => (
        <div className="flex space-x-2">
          <ViewDetailCourse courseId={record.courseId} />
          <UpdateCourse
            courseId={record.courseId}
            refetchCourses={refetchCourses}
          />
          <DeleteOutlined
            onClick={() => showDeleteConfirm(record.courseId)}
            style={{ color: "red", marginLeft: 12 }}
          />
          <Link
            to={`/staff/internalCourses/${record.courseId}`}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <SolutionOutlined className="mt-1.5" />
          </Link>
        </div>
      ),
    },
  ];
  const showDeleteConfirm = (courseId: string) => {
    confirm({
      title: "Are you sure delete this course?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteCourse(courseId);
        message.success("course deleted successfully!");
        refetchCourses();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center bg-gradient-to-r  p-4">
        <div className="flex items-center ">
          <div>
            <CreateCourse refetchCourses={refetchCourses} />
          </div>
        </div>

        <div className="mr-10 flex items-center">
          <div className="mr-10">
            <Link
              to="checkEnrollCode"
              className="px-4 py-2 bg-white/70 text-blue-600 hover:text-white hover:bg-blue-500 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Check EnrollCode
            </Link>
          </div>
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 h-[90vh]">
        <div className="col-span-10 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          {loading ? (
            <div className="text-center text-lg text-yellow-500">
              Loading...
            </div>
          ) : course.length > 0 ? (
            <Table
              dataSource={course}
              columns={columns}
              rowKey="courseId"
              pagination={{ pageSize: 10 }}
              className="header-bg-pink"
            />
          ) : (
            <div className="text-center text-red-500">
              No courses available.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InternalCourses;
