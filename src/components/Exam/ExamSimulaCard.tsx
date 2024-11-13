import React from "react";
import { allExamPaginationData } from "../../models/SimulationExam/simulationExam";
import Coin from "../../assets/images/Coin.png";

interface ExamSimulaCardProps extends allExamPaginationData {
  onClick?: () => void;
  isInCart: boolean;
  isPurchased: boolean;
  isInPayment?: boolean;
}

const ExamSimulaCard: React.FC<ExamSimulaCardProps> = ({
  examId,
  examName,
  examCode,
  examDescription,
  examFee,
  examDiscountFee,
  examImage,
  onClick,
  isInCart,
  isPurchased,
  isInPayment
}) => {
  const buttonText = isPurchased
    ? "Purchased"
    : isInCart
    ? "In Cart"
    : isInPayment
    ? "In Payment"
    : "Add To Cart";
  const buttonStyles =
    isPurchased || isInCart || isInPayment
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700";

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
        <button
          onClick={onClick}
          className={`${buttonStyles} text-white px-4 py-2 rounded-lg`}
          disabled={isInCart || isPurchased || isInPayment}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ExamSimulaCard;
