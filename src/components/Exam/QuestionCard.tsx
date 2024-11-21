import { FaFlag } from "react-icons/fa";

type QuestionProps = {
  question: {
    questionText: string;
    options: { answerId: number; answerText: string }[];
    correctAnswerIndex: number;
  };
  currentQuestionIndex: number;
  selectedAnswer: number[] | null;
  flagged: boolean;
  onFlag: () => void;
  onSelectAnswer: (answerId: number) => void;
  onClearAnswer: () => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  currentQuestionIndex,
  selectedAnswer,
  flagged,
  onFlag,
  onSelectAnswer,
  onClearAnswer,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Question {currentQuestionIndex + 1}
        </h2>
        <button
          onClick={onFlag}
          className={`p-2 rounded-full transition-colors duration-200 ${
            flagged 
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-500" 
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          title={flagged ? "Remove flag" : "Flag question"}
        >
          <FaFlag size={20} />
        </button>
      </div>

      <div className="mb-8">
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
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
              ${selectedAnswer?.includes(option.answerId)
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              }
            `}
          >
            <span className="block text-base">{option.answerText}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClearAnswer}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
            ${selectedAnswer?.length && selectedAnswer?.length > 0 
              ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30' 
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
          disabled={!selectedAnswer?.length}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-4 h-4"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
            />
          </svg>
          Clear Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
