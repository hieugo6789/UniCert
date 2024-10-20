import { Button, message, Modal, Table } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useCourse from "../../hooks/useCourse";
import { allCoursePaginationData } from "../../models/course";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useDeleteCourse from "../../hooks/useDeleteCourse";

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
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
      render: (text: string) => <span className="text-blue-600">{text}</span>,
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
      render: (fee: number) => <span className="text-red-600">${fee}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: allCoursePaginationData) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 transition-all duration-300"
            onClick={() => handleEditCourse(record.courseId)}
          >
            Edit
          </Button>
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

  // Handlers for editing and deleting courses
  const handleEditCourse = (courseId: string) => {
    console.log("Editing course:", courseId);
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4">
        <div className="text-2xl font-semibold">Course Management</div>
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
