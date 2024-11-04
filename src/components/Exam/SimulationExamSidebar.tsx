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
  return (
    <div className="w-full bg-gray-200 h-full shadow-lg p-4 relative xl:w-2/12 xl:fixed top-4 right-0 md:top-6 xl:top-20">
      <h2 className="text-lg font-bold mb-4">Question Grid</h2>
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-full h-10 rounded 
              ${index === currentQuestionIndex ? 'bg-green-700 text-white' : ''} 
              ${selectedAnswers[index] !== null ? 'bg-blue-500 text-white' : 'bg-white text-black'}
              ${flaggedQuestions[index] ? 'bg-yellow-500 text-white' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <CustomButton label="Submit" className="col-span-4 mt-4" />
      </div>
    </div>
  );
};

export default SimulationExamSidebar;
