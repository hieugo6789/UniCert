// import { Button } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import useCourse from "../../hooks/useCourse";
// import { useState } from "react";

const InternalCourses = () => {
  const { course, loading } = useCourse();
  // const { course, loading, refetchCourses } = useCourse();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize] = useState(8);
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          {loading ? (
            <div>Loading...</div>
          ) : course.length > 0 ? (
            course.map((m) => <div key={m.courseId}>{m.courseName}</div>)
          ) : (
            <div>No organizations available.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default InternalCourses;
