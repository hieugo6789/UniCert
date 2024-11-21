import React, { useState } from 'react';
import { courseEnrollment } from '../../models/enrollment';
import CustomButton from '../UI/CustomButton';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import Cookies from 'js-cookie';
import Coin from "../../assets/images/Coin.png";
import { showToast } from '../../utils/toastUtils';

interface HistoryCourseCardProps {
  enrollment: courseEnrollment;
  onStatusChange?: () => void;
  onClick?: () => void;
}

const HistoryCourseCard: React.FC<HistoryCourseCardProps> = ({ enrollment, onStatusChange, onClick }) => {
  const { handleCreatePayment } = useCreatePayment();
  const userId = Cookies.get("userId");
  const [enrollStatus, setEnrollStatus] = useState(enrollment.courseEnrollmentStatus);

  const handlePayment = async () => {
    try {
      await handleCreatePayment({
        userId: userId?.toString() || "",
        examEnrollmentId: 0,
        courseEnrollmentId: enrollment.courseEnrollmentId,
      });
      setEnrollStatus('Completed');
      showToast("Payment completed successfully", "success");
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      showToast("Payment failed", "error");
    }
  };

  return (
    <div onClick={onClick} className="shadow-lg rounded-lg bg-white p-4 sm:p-6 md:p-8">
      {/* Enrollment Information */}
      <div className="border-b pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Enrollment #{enrollment.courseEnrollmentId}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enrolled on {new Date(enrollment.courseEnrollmentDate).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              enrollStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {enrollStatus}
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2 flex items-center sm:justify-end gap-2">
              {enrollment.totalPrice}
              <img src={Coin} alt="coin" className="h-5 w-5"/>
            </p>
          </div>
        </div>

        {enrollStatus === 'OnGoing' && (
          <CustomButton
            label="Complete Payment"
            onClick={handlePayment}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md w-full transition duration-150"
          />
        )}
      </div>

      {/* Course List */}
      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Enrolled Courses
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {enrollment.courseDetails.map((course) => (
            <div
              key={course.courseId}
              className="group hover:shadow-lg transition-shadow duration-200 rounded-lg p-3 bg-gray-50"
            >
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-full h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mt-2 text-center">
                {course.courseName}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryCourseCard;
