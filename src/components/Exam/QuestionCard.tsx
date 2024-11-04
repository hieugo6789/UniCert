import { FaFlag } from 'react-icons/fa';

type QuestionProps = {
  question: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
  };
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  flagged: boolean;
  onFlag: () => void;
  onSelectAnswer: (answerIndex: number) => void;
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
      <h2 className="text-xl font-bold mb-4">Question: {currentQuestionIndex + 1}</h2>
      <p className="mb-4">{question.questionText}</p>
      <button
        onClick={onFlag}
        className={`absolute top-4 right-4 ${flagged ? 'text-yellow-500' : 'text-gray-400'}`}
      >
        <FaFlag size={24} />
      </button>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-2 border rounded ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
