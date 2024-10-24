import React from 'react';
import { allExamPaginationData } from '../../models/simulationExam';

// type ExamProps = {
//   examId: number;
//   examName: string;
//   examCode: string;
//   certId: number;
//   examDescription: string;
//   examFee: number;
//   examDiscountFee?: number;
//   examImage: string;
// };

const ExamSimulaCard: React.FC<allExamPaginationData> = ({
  examId,
  examName,
  examCode,
  examDescription,
  examFee,
  examDiscountFee,
  examImage,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 w-80">
      <div className="flex flex-row items-center justify-between mb-4">
        <span className="text-gray-500">EXAM #{examId}</span>
        <span className="text-sm text-blue-600 font-semibold">{examCode}</span>
      </div>
      <img
        className="rounded-lg w-full h-32 object-cover"
        src={examImage}
        alt={examName}
      />
      <div className="py-4">
        <h3 className="text-lg font-semibold">{examName}</h3>
        <p className="text-sm text-gray-600">{examDescription}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-gray-500 line-through">{examFee.toLocaleString('en-US')}₫</span>
          {examDiscountFee && (
            <span className="text-green-500 font-bold ml-2">{examDiscountFee.toLocaleString('en-US')}₫</span>
          )}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default ExamSimulaCard;
