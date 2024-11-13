
import CustomButton from "../UI/CustomButton";

type SidebarProps = {
  questions: { id: number }[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: (number | null)[];
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
  // const id = Number(useParams().id || 0);
  // const navigate = useNavigate();

  

  return (
    <div className="bg-white shadow-lg p-4 z-50 w-full 
      md:w-full md:relative md:bottom-0
      lg:fixed lg:right-0 lg:w-[300px] lg:top-[5rem] lg:h-[calc(100vh-4rem)] 
      xl:w-[300px] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Question Navigation</h2>


        <CustomButton
          onClick={handleSubmitExam}
          label="Submit Exam"
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
        />
        <div className="flex flex-wrap gap-3 mb-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Flagged</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 xl:grid-cols-4 gap-2 mb-4">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`
                w-full aspect-square rounded-lg font-medium transition-all duration-200
                flex items-center justify-center text-sm
                ${index === currentQuestionIndex
                  ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2'
                  : flaggedQuestions[index]
                    ? 'bg-yellow-500 text-white'
                    : selectedAnswers[index] != null
                      ? 'bg-blue-500 text-white'
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
  );
};

export default SimulationExamSidebar;
