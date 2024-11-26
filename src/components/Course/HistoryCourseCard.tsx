import React, { useState, useEffect } from 'react';
import { courseEnrollment } from '../../models/enrollment';
import CustomButton from '../UI/CustomButton';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import Cookies from 'js-cookie';
import Coin from "../../assets/images/Coin.png";
import { showToast } from '../../utils/toastUtils';
import { Modal } from 'antd';
import useWalletDetail from '../../hooks/Wallet/useWalletDetail';

interface HistoryCourseCardProps {
  enrollment: courseEnrollment; 
  onStatusChange?: () => void;
  onClick?: () => void;
}

const HistoryCourseCard: React.FC<HistoryCourseCardProps> = ({ enrollment, onStatusChange, onClick }) => {
  const { handleCreatePayment } = useCreatePayment();
  const userId = Cookies.get("userId");
  const [enrollStatus, setEnrollStatus] = useState(enrollment.courseEnrollmentStatus);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { wallets, getWalletDetails } = useWalletDetail();

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, null);
    }
  }, [userId]);

  const handlePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

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
    } catch (error: any) {
      showToast(`${error.response?.data?.message || "Unknown error"}`, "error");  
    }
  };

  return (
    <div onClick={onClick} className="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8">
      {/* Enrollment Information */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Enrollment #{enrollment.courseEnrollmentId}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enrolled on {new Date(enrollment.courseEnrollmentDate).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              enrollStatus === 'Completed' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700' 
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700'
            }`}>
              {enrollStatus}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 flex items-center sm:justify-end gap-2">
              {enrollment.totalPrice}
              <img src={Coin} alt="coin" className="h-5 w-5"/>
            </p>
          </div>
        </div>

        {enrollStatus === 'OnGoing' && (
          <CustomButton
            label="Complete Payment"
            onClick={handlePaymentModal}
            className="mt-4 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2.5 px-4 rounded-md w-full transition duration-150"
          />
        )}
      </div>

      {/* Course List */}
      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Enrolled Courses
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {enrollment.courseDetails.map((course) => (
            <div
              key={course.courseId}
              className="group hover:shadow-lg transition-shadow duration-200 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/50"
            >
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-full h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2 text-center">
                {course.courseName}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Confirm Payment"
        visible={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Enrollment Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {enrollment?.totalPrice}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Your Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="border-t dark:border-gray-600 pt-4">
              <button
                onClick={handlePayment}                
                className="w-full px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg font-medium 
                  hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors disabled:bg-purple-300 dark:disabled:bg-purple-500"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HistoryCourseCard;
