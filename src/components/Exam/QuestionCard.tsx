import { FaFlag } from "react-icons/fa";

type QuestionProps = {
  question: {
    questionText: string;
    options: { answerId: number; answerText: string }[]; // Changed to include answerId
    correctAnswerIndex: number;
  };
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  flagged: boolean;
  onFlag: () => void;
  onSelectAnswer: (answerId: number) => void; // Accepting answerId
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
    <div className="bg-white p-6 rounded shadow relative">
      <h2 className="text-xl font-bold mb-4">
        Question: {currentQuestionIndex + 1}
      </h2>
      <div
        className="prose list-disc whitespace-pre-wrap text-large mb-1"
        dangerouslySetInnerHTML={{
          __html: question.questionText || "",
        }}
      />
      {/* <p className="mb-4">{question.questionText}</p> */}
      <button
        onClick={onFlag}
        className={`absolute top-4 right-4 ${
          flagged ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        <FaFlag size={24} />
      </button>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.answerId} // Use answerId as key
            onClick={() => onSelectAnswer(option.answerId)} // Passing answerId to onSelectAnswer
            className={`w-full p-2 border rounded ${
              selectedAnswer === option.answerId
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
          >
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
