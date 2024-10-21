import { Button, message, Modal, Spin, Table, Tag } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useCourse from "../../hooks/Course/useCourse";
import { allCoursePaginationData } from "../../models/course";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useDeleteCourse from "../../hooks/Course/useDeleteCourse";
import { useState } from "react";
import useCourseDetail from "../../hooks/Course/useCourseDetail";
import UpdateCourse from "../../components/Course/UpdateCourse";

const { confirm } = Modal;

const InternalCourses = () => {
  const { course, loading, refetchCourses } = useCourse();
  const { handleDeleteCourse } = useDeleteCourse();
  const { state, getCourseDetails } = useCourseDetail();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleView = async (courseId: string) => {
    setIsModalVisible(true);
    await getCourseDetails(courseId);
  };

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
      render: (record: allCoursePaginationData) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleView(record.courseId)}>View</Button>
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
      <Modal
        title="Course Details"
        width={900}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {state.isLoading ? (
          <Spin />
        ) : state.currentCourse ? (
          <div className="text-lg">
            <p>
              <strong>Name: </strong> {state.currentCourse.courseName}
            </p>
            <p>
              <strong>Code: </strong> {state.currentCourse.courseCode}
            </p>
            {/* <strong>Description: </strong>
            <div
              className="prose list-disc whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: state.currentCourse. || "",
              }}
            /> */}
            <p>
              <strong>Certification: </strong>
              {state.currentCourse.certificationDetails?.map((cert, index) => (
                <Tag key={index}>
                  {cert.certCode} - {cert.certName}
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

export default InternalCourses;
