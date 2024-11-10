import React, { useState } from 'react';
import { courseEnrollment } from '../../models/enrollment';
import CustomButton from '../UI/CustomButton';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import Cookies from 'js-cookie';
import Coin from "../../assets/images/Coin.png"
import { showToast } from '../../utils/toastUtils';
interface CourseEnrollmentCardProps {
  enrollment: courseEnrollment;
}

const HistoryCourseCard: React.FC<CourseEnrollmentCardProps> = ({ enrollment }) => {
  const {handleCreatePayment} = useCreatePayment();
  const userId = Cookies.get("userId");
  const handlePayment  =  async() => {
    await handleCreatePayment({
      userId: userId?.toString() || "",
      examEnrollmentId: 0,
      courseEnrollmentId: enrollment.courseEnrollmentId,
    });
    showToast("Payment completed successfully", "success");

  }
  const [enrollStatus, setEnrollStatus] = useState(enrollment.courseEnrollmentStatus);
  return (
    <div className="shadow-lg rounded-lg bg-white p-8">
      {/* Enrollment Information */}
      <div className="border-b pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enrollment #{enrollment.courseEnrollmentId}</h2>
            <p className="text-sm text-gray-600 mt-1">Enrolled on {new Date(enrollment.courseEnrollmentDate).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              enrollStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {enrollStatus}
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2 flex items-center justify-end gap-2">
              {enrollment.totalPrice}
              <img src={Coin} alt="coin" className="h-5 w-5"/>
            </p>
          </div>
        </div>

        {enrollStatus === 'OnGoing' && (
          <CustomButton
            label="Complete Payment"
            onClick={() => {handlePayment();setEnrollStatus('Completed')}}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md w-full transition duration-150"
          />
        )}
      </div>

      {/* Course List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Courses</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {enrollment.courseDetails.map((course) => (
            <div key={course.courseId} className="group hover:shadow-lg transition-shadow duration-200 rounded-lg p-3 bg-gray-50">
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-full h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h4 className="text-sm font-medium text-gray-900 mt-2 text-center">{course.courseName}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryCourseCard;
