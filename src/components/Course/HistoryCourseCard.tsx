
import { courseEnrollment } from '../../models/enrollment';
interface CourseEnrollmentCardProps {
    enrollment: courseEnrollment;
  }
const HistoryCourseCard: React.FC<CourseEnrollmentCardProps> = ({ enrollment }) => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Enrollment ID: {enrollment.courseEnrollmentId}
          </h2>
          <p className="text-gray-600">
            Date: {new Date(enrollment.courseEnrollmentDate).toLocaleDateString()}
          </p>
          <p className={`text-sm font-semibold mt-1 ${enrollment.courseEnrollmentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
            Status: {enrollment.courseEnrollmentStatus}
          </p>
          <p className="text-lg font-bold mt-2 text-gray-800">Total Price: ${enrollment.totalPrice}</p>
  
          <h3 className="text-lg font-semibold mt-4 text-gray-700">Courses:</h3>
          <div className="mt-2 space-y-4">
            {enrollment.courseDetails.map((course) => (
              <div key={course.courseId} className="flex items-center">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-medium text-gray-800">{course.courseName}</p>
                  <p className="text-gray-500">Code: {course.courseCode}</p>
                  <p className="text-gray-500">
                    
                    {course.courseDiscountFee > 0 ? (
                      <div>
                        Fee: ${course.courseDiscountFee}{' '}
                        <span className="text-red-500 line-through">${course.courseFee}</span>
                      </div>
                    ) : (
                      <span>Fee: ${course.courseFee}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default HistoryCourseCard;
