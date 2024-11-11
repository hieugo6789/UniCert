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
    setEnrollStatus('Completed');
    showToast("Payment completed successfully", "success");
  };


  const handleTakeExam = (examId: number) => {    
    console.log(`Starting exam with ID: ${examId}`);   
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="shadow-lg rounded-lg bg-white p-8">
      {/* Enrollment Information */}
      <div className="border-b pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enrollment #{enrollment.examEnrollmentId}</h2>
            <p className="text-sm text-gray-600 mt-1">Enrolled on {new Date(enrollment.examEnrollmentDate).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              enrollStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {enrollStatus}
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2 flex items-center justify-end gap-2">
              {enrollment.totalPrice}
              <img src={coin} alt="coin" className="h-5 w-5"/>
            </p>
          </div>
        </div>

        {enrollStatus === 'OnGoing' && (
          <CustomButton
            label="Complete Payment"
            onClick={handleExam}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md w-full transition duration-150"
          />
        )}
      </div>

      {/* Exams List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Exams</h3>
        <div className="space-y-4">
          {enrollment.simulationExamDetail.map((exam) => (
            <div key={exam.examId} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-150">
              <div className="flex items-center gap-4">
                <img
                  src={exam.examImage}
                  alt={exam.examName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{exam.examName}</h4>
                  <p className="text-sm text-gray-600 mt-1">{exam.examDescription}</p>
                </div>
              </div>
              <CustomButton
                label="Take Exam"
                onClick={() => handleTakeExam(exam.examId)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition duration-150"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryExamCard;
