import React, { useState } from 'react';
import { courseEnrollment } from '../../models/enrollment';
import CustomButton from '../UI/CustomButton';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import Cookies from 'js-cookie';
import coin from "../../assets/images/coin.png";
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
    <div className="flex flex-col md:flex-row 
    shadow-xl rounded-xl bg-gray-200 py-1">

      {/* Thông tin Enrollment */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold text-gray-800">
          Enrollment ID: {enrollment.courseEnrollmentId}
        </h2>
        <p className="text-sm text-gray-500">
          Date: {new Date(enrollment.courseEnrollmentDate).toLocaleDateString()}
        </p>
        <p
          className={`text-sm font-semibold mt-1 ${enrollStatus === 'Completed'
            ? 'text-green-500'
            : 'text-yellow-500'
            }`}
        >
          Status: {enrollStatus}
        </p>
        <p className="text-lg font-bold text-gray-800 mt-2 flex items-center gap-1">
          Total Price: {enrollment.totalPrice} 
          <img src={coin} alt="coin" className='h-5'/>
        </p>
        {enrollStatus === 'OnGoing' && (
          <CustomButton
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
            onClick={() => {handlePayment();setEnrollStatus('Completed')}}
            label="Complete Payment"
          />
        )}
      </div>

      {/* Danh sách Courses/Exams */}
      <div className='grid mr-3'>
        <p>Course List</p>
        <div className="p-4 flex flex-wrap gap-1">
          {enrollment.courseDetails.map((course) => (
            <div key={course.courseId} className="flex flex-col items-center">
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-20 h-20 object-cover rounded-md object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryCourseCard;
