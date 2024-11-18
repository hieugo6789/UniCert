import React, { useState } from "react";
import { allExamPaginationData } from "../../models/SimulationExam/simulationExam";
import Coin from "../../assets/images/Coin.png";

interface ExamSimulaCardProps extends allExamPaginationData {
  onClick?: () => void;
  isInCart: boolean;
  isPurchased: boolean;
  isInPayment?: boolean;
  onBuyNow?: () => void;
}

const ExamSimulaCard: React.FC<ExamSimulaCardProps> = ({
  examId,
  examName,
  examCode,
  examDescription,
  examFee,
  examDiscountFee,
  examImage,
  duration,
  questionCount,
  onClick,
  isInCart,
  isPurchased,
  isInPayment,
  onBuyNow
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isPurchased && onClick) {
      onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col bg-white shadow-md rounded-lg p-4 w-80 
        ${isPurchased ? 'cursor-pointer hover:shadow-xl hover:scale-[1.05] transition-all duration-200' : ''}`}
    >
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
        <p className="text-sm text-gray-600">Duration: {duration} minutes</p>
        <p className="text-sm text-gray-600">Number of questions: {questionCount}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
          {examDiscountFee === examFee ? (
            <div className="flex items-center">
              <span className="text-green-500 font-bold mr-1">
                {examDiscountFee.toLocaleString("en-US")}
              </span>
              <img
                src={Coin}
                alt="Coin Icon"
                className="w-5 h-5 inline-block"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center">
                <span className="text-gray-500 line-through mr-1">
                  {examFee.toLocaleString("en-US")}
                </span>
                <img
                  src={Coin}
                  alt="Coin Icon"
                  className="w-5 h-5 inline-block"
                />
              </div>
              <div className="flex items-center">
                <span className="text-green-500 font-bold mr-1">
                  {examDiscountFee.toLocaleString("en-US")}
                </span>
                <img
                  src={Coin}
                  alt="Coin Icon"
                  className="w-5 h-5 inline-block"
                />
              </div>
            </div>
          )}
        </div>
        {isPurchased ? (
          <button
            className={`${
              isHovered 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-gray-400"
            } text-white px-4 py-2 rounded-lg transition-colors duration-200`}
            disabled={!isHovered}
          >
            {isHovered ? "Take Exam" : "Purchased"}
          </button>
        ) : isInPayment ? (
          <button
            className="bg-gray-400 cursor-not-allowed text-white px-4 py-2 rounded-lg"
            disabled
          >
            In Payment
          </button>
        ) : isInCart ? (
          <button
            className="bg-gray-400 cursor-not-allowed text-white px-4 py-2 rounded-lg"
            disabled
          >
            In Cart
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow?.();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Buy Now
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Add To Cart
            </button>            
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSimulaCard;
