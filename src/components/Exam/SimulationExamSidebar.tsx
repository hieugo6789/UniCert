import CustomButton from "../UI/CustomButton";

type SidebarProps = {
  questions: { id: number }[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: number[][];
  flaggedQuestions: boolean[];
  timeLeft: number;
  handleSubmitExam: () => void;
};

const SimulationExamSidebar: React.FC<SidebarProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedAnswers,
  flaggedQuestions,
  handleSubmitExam
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 z-50 w-full overflow-y-auto my-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800 text-center">Exam Overview</h2>          
        </div>

        {/* Submit Button */}
        <CustomButton
          onClick={handleSubmitExam}
          label="Submit Exam"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
        />

        {/* Legend */}
        <div className="bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Question Status</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-md"></div>
              <span className="text-sm text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-md"></div>
              <span className="text-sm text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-md"></div>
              <span className="text-sm text-gray-600">Flagged</span>
            </div>
          </div>
        </div>

        {/* Question Grid */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Question Navigation</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`
                  w-full aspect-square rounded-lg font-medium transition-all duration-200
                  flex items-center justify-center text-sm shadow-sm
                  hover:transform hover:scale-105
                  ${index === currentQuestionIndex
                    ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2'
                    : flaggedQuestions[index]
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : selectedAnswers[index]?.length > 0
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationExamSidebar;
