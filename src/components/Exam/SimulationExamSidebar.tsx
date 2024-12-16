import CustomButton from "../UI/CustomButton";

type SidebarProps = {
  questions: { id: number; questionType: string }[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: number[][];
  essayAnswers: string[];
  flaggedQuestions: boolean[];
  visibleQuestionIndexes: number[]; // Chỉ số các câu hỏi hiển thị
  handleSubmitExam: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Để điều hướng đến trang
  questionsPerPage: number; // Số câu hỏi mỗi trang
};

const SimulationExamSidebar: React.FC<SidebarProps> = ({
  questions,
  setCurrentQuestionIndex,
  selectedAnswers,
  essayAnswers,
  flaggedQuestions,
  visibleQuestionIndexes,
  handleSubmitExam,
  setCurrentPage,
  questionsPerPage,
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
              <span className="text-sm text-gray-600 dark:text-gray-300">Visible</span>
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
          <div className="grid grid-cols-9 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-7 gap-2">
            {questions.map((q, index) => {
              // Kiểm tra màu sắc dựa trên trạng thái câu hỏi
              const isVisible = visibleQuestionIndexes.includes(index);
              const isFlagged = flaggedQuestions[index];
              const isAnswered =
                q.questionType === "Essay"
                  ? essayAnswers[index] && essayAnswers[index].trim() !== ""
                  : selectedAnswers[index]?.length > 0;
              const buttonClass = `
                w-8 h-8 rounded-lg font-medium transition-all duration-200
                flex items-center justify-center text-sm shadow-sm
                hover:transform hover:scale-105
                ${    visibleQuestionIndexes.includes(q.id) 
                  ? "bg-green-600 dark:bg-green-500 text-white ring-2 ring-green-600 dark:ring-green-500 ring-offset-2 dark:ring-offset-gray-800"
                  : isVisible
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800"
                  : isFlagged
                  ? "bg-yellow-500 dark:bg-yellow-400 text-white hover:bg-yellow-600 dark:hover:bg-yellow-500"
                  : isAnswered
                  ? "bg-blue-500 dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-500"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              
              `;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    // Điều chỉnh trang hiện tại nếu cần thiết
                    const newPage = Math.floor(index / questionsPerPage) + 1;
                    setCurrentPage(newPage);
                    setCurrentQuestionIndex(index);
                  }}
                  className={buttonClass}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationExamSidebar;
