import React, { useState } from 'react';
import { examEnrollment } from "../../models/enrollment";
import CustomButton from "../UI/CustomButton";
import Cookies from 'js-cookie';
import { useCreatePayment } from '../../hooks/Payment/useCreatePayment';
import coin from "../../assets/images/Coin.png";
import { showToast } from '../../utils/toastUtils';
import { useNavigate } from 'react-router-dom';

interface ExamEnrollmentCardProps {
  enrollment: examEnrollment;
}

const HistoryExamCard: React.FC<ExamEnrollmentCardProps> = ({ enrollment }) => {
  const navigate = useNavigate();
  const { handleCreatePayment } = useCreatePayment();
  const userId = Cookies.get("userId");
  const [enrollStatus, setEnrollStatus] = useState(enrollment.examEnrollmentStatus);

  const handleExam = async () => {
    await handleCreatePayment({
      userId: userId?.toString() || "",
      courseEnrollmentId: 0,
      examEnrollmentId: enrollment.examEnrollmentId,
    });
    setEnrollStatus('Completed'); // Cập nhật trạng thái sau khi thi
    showToast("Payment completed successfully", "success");
  };

  const handleTakeExam = (examId: number) => {    
    console.log(`Starting exam with ID: ${examId}`);   
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="flex flex-col md:flex-row shadow-xl rounded-xl bg-gray-200 py-1">
      {/* Thông tin Enrollment */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold text-gray-800">
          Enrollment ID: {enrollment.examEnrollmentId}
        </h2>
        <p className="text-sm text-gray-500">
          Date: {new Date(enrollment.examEnrollmentDate).toLocaleDateString()}
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
            label="Complete Payment"
            onClick={handleExam}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          />
        )}
      </div>

      {/* Danh sách Exams */}
      <div className="grid mr-3">
        <h3 className="text-lg font-semibold mt-4 text-gray-700">Exams:</h3>
        <div className="mt-2 space-y-4">
          {enrollment.simulationExamDetail.map((exam) => (
            <div key={exam.examId} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={exam.examImage}
                  alt={exam.examName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="mr-4">
                  <h4 className="text-md font-semibold">{exam.examName}</h4>
                  <p className="text-sm text-gray-600">{exam.examDescription}</p>
                </div>
              </div>
              <CustomButton
                label="Take Exam"
                onClick={() => handleTakeExam(exam.examId)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryExamCard;
