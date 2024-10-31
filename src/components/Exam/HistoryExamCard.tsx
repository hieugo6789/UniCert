
import { examEnrollment } from "../../models/enrollment";
import CustomButton from "../UI/CustomButton";
interface ExamEnrollmentCardProps {
    enrollment: examEnrollment;
  }

const HistoryExamCard: React.FC<ExamEnrollmentCardProps> = ({ enrollment }) => {

  const takeExam = () => {
    return true;
  }

    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enrollment ID: {enrollment.examEnrollmentId}</h2>
          <p className="text-gray-600">
            Date: {new Date(enrollment.examEnrollmentDate).toLocaleDateString()}
          </p>
          <p className={`text-sm font-semibold mt-1 ${enrollment.examEnrollmentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
            Status: {enrollment.examEnrollmentStatus}
          </p>
          <p className="text-lg font-bold mt-2 text-gray-800">Total Price: ${enrollment.totalPrice}</p>
          
          <h3 className="text-lg font-semibold mt-4 text-gray-700">Exams:</h3>
          <div className="mt-2 space-y-4">
            {enrollment.simulationExamDetail.map((exam) => (
              <div key={exam.examId} className="flex items-center">
                <img
                  src={exam.examImage}
                  alt={exam.examName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-medium text-gray-800">{exam.examName}</p>
                  <p className="text-gray-500">Code: {exam.examCode}</p>
                  <p className="text-gray-500">                    
                    {exam.examDiscountFee > 0 ? (
                      <div>
                        Fee: ${exam.examDiscountFee}{' '}
                        <span className="text-red-500 line-through">${exam.examFee}</span>
                      </div>
                    ):(
                      <span>Fee: ${exam.examFee}</span>
                    )}
                  </p>
                  <CustomButton label="Take Exam" shining onClick={takeExam} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default HistoryExamCard;
