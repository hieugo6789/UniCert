import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../UI/CustomButton";

type SidebarProps = {
  questions: { id: number }[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: (number | null)[];
  flaggedQuestions: boolean[];
};

const SimulationExamSidebar: React.FC<SidebarProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedAnswers,
  flaggedQuestions,
}) => {
  const id = Number(useParams().id || 0);
  const navigate = useNavigate();

  const handleSubmitExam = () => {
    // Map questions to create the required JSON structure
    const formattedAnswers = questions.map((question, index) => ({
      questionId: question.id, // Use the actual question ID
      userAnswerId: selectedAnswers[index] !== null ? [selectedAnswers[index]] : [], // Wrap answer in an array
    }));

    // Navigate to "/submit-exam" and pass formattedAnswers as state
    navigate("/exam/"+id+"/simulation/submit", { state: { formattedAnswers } });
  };

  return (
    <div className="w-full bg-gray-200 h-full shadow-lg p-4 relative xl:w-2/12 xl:fixed top-4 right-0 md:top-6 xl:top-20 overflow-y-auto min-h-screen">
      <h2 className="text-lg font-bold mb-4">Question Grid</h2>
      <CustomButton onClick={handleSubmitExam} label="Submit Exam" />
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-full h-10 rounded 
              ${index === currentQuestionIndex ? 'bg-green-700 text-white' :
                selectedAnswers[index] != null ? 'bg-blue-500 text-white' :
                  flaggedQuestions[index] ? 'bg-yellow-500 text-white' :
                    'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimulationExamSidebar;
