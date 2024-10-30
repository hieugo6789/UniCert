import { useNavigate } from "react-router-dom";
import { allCoursePaginationData } from "../../models/course";

interface CourseCardProps {
  course: allCoursePaginationData;
  onClick: () => void;
}

const CourseCard = ({ course, onClick }: CourseCardProps) => {
  const navigate = useNavigate();
  return (

    <div className="border p-6 rounded-lg shadow-lg" onClick={() => navigate("/course/" + course.courseId)}>
      <h2 className="text-xl font-bold">{course.courseName}</h2>
      <p className="text-gray-500 mt-2">{course.courseCode}</p>
      <img src={course.courseImage} alt={course.courseName} className="mt-4 h-30 m-auto shadow-lg" />
      {/* course fee */}
      <p className="text-black-500 mt-4">Course Fee: {course.courseFee}</p>
      {/* course duration */}
      <p className="text-black-500 mt-4">Course Duration: {course.courseTime}</p>
      <p onClick={(e) => {
          e.stopPropagation(); // Ngăn sự kiện click lan truyền lên component cha
          onClick();
        }}className="text-blue-500 mt-4 block rounded-full text-l text-right cursor-pointer hover:text-blue-300 hover:underline">Add To Cart {">"}</p>
    </div>

  )
}

export default CourseCard
