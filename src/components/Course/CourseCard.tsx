import { useNavigate } from "react-router-dom";
import { allCoursePaginationData } from "../../models/course";



const CourseCard = (course:allCoursePaginationData) => {
  const navigate = useNavigate();
  return (
    
        <div className="border p-6 rounded-lg shadow-lg" onClick={()=>navigate("/course/"+course.courseId)}>
          <h2 className="text-xl font-bold">{course.courseName}</h2>
          <p className="text-gray-500 mt-2">{course.courseCode}</p>
          <img src={course.courseImage} alt={course.courseName} className="mt-4 h-30 m-auto shadow-lg" />
          {/* course fee */}
          <p className="text-black-500 mt-4">Course Fee: {course.courseFee}</p>
          {/* course duration */}
          <p className="text-black-500 mt-4">Course Duration: {course.courseTime}</p>
          <a href={"/"} className="text-blue-500 mt-4 block rounded-full text-l text-right">Add To Cart {">"}</a>
        </div>
      
  )
}

export default CourseCard
