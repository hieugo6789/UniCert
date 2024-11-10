import { FaFlag } from "react-icons/fa";

type QuestionProps = {
  question: {
    questionText: string;
    options: { answerId: number; answerText: string }[];
    correctAnswerIndex: number;
  };
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  flagged: boolean;
  onFlag: () => void;
  onSelectAnswer: (answerId: number) => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  currentQuestionIndex,
  selectedAnswer,
  flagged,
  onFlag,
  onSelectAnswer,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Question {currentQuestionIndex + 1}
        </h2>
        <button
          onClick={onFlag}
          className={`p-2 rounded-full transition-colors duration-200 ${
            flagged 
              ? "bg-yellow-100 text-yellow-500" 
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
          title={flagged ? "Remove flag" : "Flag question"}
        >
          <FaFlag size={20} />
        </button>
      </div>

      <div className="mb-8">
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: question.questionText || "",
          }}
        />
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.answerId}
            onClick={() => onSelectAnswer(option.answerId)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              ${selectedAnswer === option.answerId
                ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }
            `}
          >
            <span className="block text-base">{option.answerText}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
