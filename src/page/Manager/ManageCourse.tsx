import { Table, Tag } from "antd";
import ViewDetailCourse from "../../components/Course/ViewDetailCourse";
import useCourse from "../../hooks/Course/useCourse";
import UpdatePermission from "../../components/Permission/UpdatePermission";
import useCoursePermission from "../../hooks/Course/useCoursePermission";
import Coin from "../../assets/images/Coin.png";

const ManageCourse = () => {
  const { course, loading, refetchCourses } = useCourse();
  const { updatePermissionCourseDetails } = useCoursePermission();

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
          {fee} <img src={Coin} />
        </span>
      ),
    },
    {
      title: "Discount Fee",
      dataIndex: "courseDiscountFee",
      key: "courseDiscountFee",
      render: (fee: number) => (
        <span className="text-yellow-600 flex justify-between items-center w-16">
          {fee} <img src={Coin} />
        </span>
      ),
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
      render: (record: any) => (
        <div className="flex space-x-2">
          <ViewDetailCourse courseId={record.courseId} />
          <UpdatePermission
            Id={record.courseId}
            refetch={refetchCourses}
            updateFunction={updatePermissionCourseDetails}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="gap-4 p-2 bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-full">
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
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
export default ManageCourse;
