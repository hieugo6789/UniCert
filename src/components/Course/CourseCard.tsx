import { allCoursePaginationData } from "../../models/course";



const CourseCard = (course:allCoursePaginationData) => {
  return (
    
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">{course.courseName}</h2>
          <p className="text-gray-500 mt-2">{course.courseDescription}</p>
          <img src={course.courseImage} alt={course.courseName} className="mt-4 h-30 m-auto shadow-lg" />
          {/* course fee */}
          <p className="text-black-500 mt-4">Course Fee: {course.courseFee}</p>
          {/* course duration */}
          <p className="text-black-500 mt-4">Course Duration: {course.courseTime}</p>
          <a href={"/"} className="text-blue-500 mt-4 block p-5 rounded-full text-xl text-right">Learn more {">"}</a>
        </div>
      
  )
}

export default CourseCard