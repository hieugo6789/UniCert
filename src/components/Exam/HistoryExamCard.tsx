import React, { useState, useEffect } from 'react';
import { examEnrollment } from "../../models/enrollment";
import CustomButton from "../UI/CustomButton";
import Cookies from 'js-cookie';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import Coin from "../../assets/images/Coin.png";
import { showToast } from '../../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import useWalletDetail from '../../hooks/Wallet/useWalletDetail';
import AverageRating from './AverageRating';
import { currentVoucher } from '../../models/voucher';
import agent from '../../utils/agent';

interface ExamEnrollmentCardProps {
  enrollment: examEnrollment;
  onStatusChange?: () => void;
}

const HistoryExamCard: React.FC<ExamEnrollmentCardProps> = ({ enrollment, onStatusChange }) => {
  const navigate = useNavigate();
  const { handleCreatePayment } = useCreatePayment();
  const userId = Cookies.get("userId");
  const [enrollStatus, setEnrollStatus] = useState(enrollment.examEnrollmentStatus);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { wallets, getWalletDetails } = useWalletDetail();
  const [vouchers, setVouchers] = useState<currentVoucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<currentVoucher | null>(null);
  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await agent.Voucher.getVoucherByUserId(userId || "");
      setVouchers(response.data);
      console.log(response)
    };
    fetchVouchers();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getWalletDetails(userId, null);
    }
  }, [userId]);

  const handlePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const handleExam = async () => {
    try {
      await handleCreatePayment({
        userId: userId?.toString() || "",
        courseEnrollmentId: 0,
        examEnrollmentId: enrollment.examEnrollmentId,
      }
        , enrollment.simulationExamDetail.map((exam) => exam.examId)
        , selectedVoucher ? [selectedVoucher.voucherId] : []);
      setEnrollStatus('Completed');
      showToast("Payment completed successfully", "success");
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error: any) {
      showToast(`${error.response?.data?.message || "Unknown error"}`, "error");
    }
  };

  const handleTakeExam = (examId: number) => {
    console.log(`Starting exam with ID: ${examId}`);
    navigate(`/exam/${examId}`);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700';
      case 'OnGoing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700';
      case 'Expired':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600';
    }
  };

  // log ra xem có voucher nào được chọn không
  // useEffect(() => {
  //   console.log(selectedVoucher);
  // }
  //   , [selectedVoucher]);

  return (
    <div className={`shadow-lg rounded-lg bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 h-full flex flex-col
      ${enrollment.examEnrollmentStatus === 'OnGoing' ? 'border border-orange-200 dark:border-orange-700' : ''}
      ${enrollment.examEnrollmentStatus === 'Expired' ? 'border border-red-200 dark:border-red-700' : ''}`}>
      {/* Enrollment Information */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Enrollment #{enrollment.examEnrollmentId}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enrolled on {new Date(enrollment.examEnrollmentDate).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
              ${getStatusStyles(enrollStatus)}`}>
              {enrollStatus}
            </p>
            {/* <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 flex items-center sm:justify-end gap-2">
              {enrollment.totalPrice}
              <img src={Coin} alt="coin" className="h-5 w-5"/>
            </p> */}
            {/* nếu có totalPriceVoucher thì gạch totalPrice hiển thị thêm totalPriceVoucher còn không thì hiển thị totalPrice thôi */}
            {enrollment.totalPriceVoucher ? (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 flex items-center sm:justify-end gap-2">
                <span className="line-through text-gray-500">{enrollment.totalPrice}</span>
                <span>{enrollment.totalPriceVoucher}</span>
                <img src={Coin} alt="coin" className="h-5 w-5" />
              </p>
            ) : (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 flex items-center sm:justify-end gap-2">
                {enrollment.totalPrice}
                <img src={Coin} alt="coin" className="h-5 w-5" />
              </p>
            )}
          </div>
        </div>

        {(enrollStatus === 'OnGoing' || enrollStatus === 'Expired') && (
          <CustomButton
            label={enrollStatus === 'Expired' ? "Buy Again" : "Complete Payment"}
            onClick={
              handlePaymentModal
            }
            className={`mt-4 py-2.5 px-4 rounded-md w-full transition-all duration-200 text-white font-medium
              ${enrollStatus === 'Expired'
                ? 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                : 'bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700'
              }`}
          />
        )}
      </div>

      {/* Exams List */}
      <div className="mt-4 sm:mt-6 flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Available Exams
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {enrollment.simulationExamDetail.map((exam) => (
            <div
              key={exam.examId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between 
                bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                transition duration-150 gap-4 sm:gap-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <img
                  src={exam.examImage}
                  alt={exam.examName}
                  className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {exam.examName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 sm:line-clamp-1">
                    {exam.examDescription}
                  </p>
                  <AverageRating examId={exam.examId} />
                </div>
              </div>
              {enrollment.examEnrollmentStatus === 'Completed' ? (
                exam.examPermission === 'Approve' ? (
                  <CustomButton
                    label="Take Exam"
                    onClick={() => handleTakeExam(exam.examId)}
                    className="w-full sm:w-auto bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 
                      text-white py-2 px-6 rounded-md transition-all duration-200"
                  />
                ) : (
                  <CustomButton
                    label="Pending"
                    disabled={true}
                    className="w-full sm:w-auto bg-gray-400 dark:bg-gray-600 text-white 
                      py-2 px-6 rounded-md cursor-not-allowed opacity-75"
                  />
                )
              ) : (
                <CustomButton
                  label="Payment Required"
                  disabled={true}
                  className="w-full sm:w-auto bg-gray-400 dark:bg-gray-600 text-white 
                    py-2 px-6 rounded-md cursor-not-allowed opacity-75"
                />
              )}
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
            <p className="text-gray-400 dark:text-gray-200 mt-2">Note: Valid for 3 days only.</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Enrollment Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {enrollment?.totalPrice}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            {/* giá sau khi áp voucher */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Discounted Price:</span>
              <span className="flex items-center gap-2 font-medium">
                {selectedVoucher
                  ? Math.ceil(enrollment.totalPrice - (enrollment.totalPrice * selectedVoucher.percentage) / 100)
                  : enrollment.totalPrice}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>

            {/* select chọn voucher */}
            <div className="flex flex-col space-y-2">


              <label htmlFor="voucher" className="text-gray-600 dark:text-gray-300">Select Voucher:</label>
              <select
                id="voucher"
                value={selectedVoucher?.voucherId || ""}
                onChange={(e) => {
                  setSelectedVoucher(vouchers.find((voucher) => voucher.voucherId.toString() === e.target.value) || null);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="" disabled>Select a voucher</option>
                {vouchers?.map((voucher) => (
                  <option key={voucher.voucherId} value={voucher.voucherId}>
                    {voucher.voucherName} - {voucher.percentage}% off
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Your Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            {/* số tiền còn lại sau khi áp voucher */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Remaining Balance:</span>
              <span className="flex items-center gap-2 font-medium">
                {userId ? wallets[userId]?.point - Math.ceil(Math.ceil(enrollment.totalPrice - (enrollment.totalPrice * (selectedVoucher?.percentage || 0)) / 100)) || 0 : 0}
                <img src={Coin} alt="coin" className="h-5" />
              </span>
            </div>
            <div className="border-t dark:border-gray-600 pt-4">
              <button
                onClick={handleExam}
                className="w-full px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg font-medium 
                  hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors disabled:bg-purple-300 dark:disabled:bg-purple-500"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </Modal >
    </div >
  );
};

export default HistoryExamCard;
