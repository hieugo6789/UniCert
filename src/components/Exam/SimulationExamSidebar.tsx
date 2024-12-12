import CustomButton from "../UI/CustomButton";

type SidebarProps = {
  questions: { id: number; questionType: string }[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: number[][];
  essayAnswers: string[];
  flaggedQuestions: boolean[];
  timeLeft: number;
  handleSubmitExam: () => void;
};

const SimulationExamSidebar: React.FC<SidebarProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedAnswers,
  essayAnswers,
  flaggedQuestions,
  handleSubmitExam
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 w-full overflow-y-auto my-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b dark:border-gray-700 pb-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">Exam Overview</h2>          
        </div>

        {/* Submit Button */}
        <CustomButton
          onClick={handleSubmitExam}
          label="Submit Exam"
          className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 rounded-lg transition-colors"
        />

        {/* Legend */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Question Status</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-md"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-md"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-400 rounded-md"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Flagged</span>
            </div>
          </div>
        </div>

        {/* Question Grid */}
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Question Navigation</h3>
          <div className="grid grid-cols-9 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-5 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`
                  w-10 h-10 rounded-lg font-medium transition-all duration-200
                  flex items-center justify-center text-sm shadow-sm
                  hover:transform hover:scale-105
                  ${index === currentQuestionIndex
                    ? 'bg-green-600 dark:bg-green-500 text-white ring-2 ring-green-600 dark:ring-green-500 ring-offset-2 dark:ring-offset-gray-800'
                    : flaggedQuestions[index]
                      ? 'bg-yellow-500 dark:bg-yellow-400 text-white hover:bg-yellow-600 dark:hover:bg-yellow-500'
                      : q.questionType === 'Essay'
                        ? (essayAnswers[index] && essayAnswers[index].trim() !== '')
                          ? 'bg-blue-500 dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        : selectedAnswers[index]?.length > 0
                          ? 'bg-blue-500 dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
