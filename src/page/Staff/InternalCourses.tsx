import { Button, message, Modal, Table, Tag } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useCourse from "../../hooks/Course/useCourse";
import { allCoursePaginationData } from "../../models/course";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useDeleteCourse from "../../hooks/Course/useDeleteCourse";
import UpdateCourse from "../../components/Course/UpdateCourse";
import CreateCourse from "../../components/Course/CreateCourse";
import ViewDetailCourse from "../../components/Course/ViewDetailCourse";

const { confirm } = Modal;

const InternalCourses = () => {
  const { course, loading, refetchCourses } = useCourse();
  const { handleDeleteCourse } = useDeleteCourse();

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text: string) => <span className="text-purple-600">{text}</span>, // Custom color for course name
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
      render: (fee: number) => <span className="text-green-600">${fee}</span>,
    },
    {
      title: "Discount Fee",
      dataIndex: "courseDiscountFee",
      key: "courseDiscountFee",
      render: (fee: number) => <span className="text-green-600">${fee}</span>,
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
          <Button
            className="bg-red-500 hover:bg-red-700 transition-all duration-300"
            onClick={() => showDeleteConfirm(record.courseId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const showDeleteConfirm = (courseId: string) => {
    confirm({
      title: "Are you sure delete this course?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await handleDeleteCourse(courseId);
        message.success("major deleted successfully!");
        refetchCourses();
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4">
        <div className="text-2xl font-semibold">
          Course Management
          <div>
            <CreateCourse refetchCourses={refetchCourses} />
          </div>
        </div>

        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-[90vh]">
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
              className="table-auto bg-gray-100"
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