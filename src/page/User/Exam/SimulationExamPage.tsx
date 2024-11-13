import { useEffect, useState } from "react";
import SimulationExamSidebar from "../../../components/Exam/SimulationExamSidebar";
import QuestionCard from "../../../components/Exam/QuestionCard";
import CustomButton from "../../../components/UI/CustomButton";
import useExamDetail from "../../../hooks/SimulationExam/useExamDetail";
import { useLocation, useNavigate, useParams } from "react-router-dom";
type Answer = {
  questionId: number;
  userAnswerId: number[];
};
const SimulationExamPage = () => {
  const id = Number(useParams().id || 0);
  const [questions, setQuestions] = useState<any[]>([]);
  const { state, getExamDetails } = useExamDetail();
  const [duration, setDuration] = useState(0);
  const location = useLocation();
  

  useEffect(() => {
    const fetchExamDetails = async () => {
      await getExamDetails(id);
    };
    fetchExamDetails();
  }, [id]);
  
  useEffect(() => {
    if (state && state.currentExam && state.currentExam.listQuestions) {
      console.log(state.currentExam);
      setDuration(state.currentExam.duration);
      const formattedQuestions = state.currentExam.listQuestions.map((q: any) => ({
        id: q.questionId,
        questionText: q.questionName,
        options: q.answers.map((answer: any) => ({
          answerId: answer.answerId,
          answerText: answer.answerText,
        })),
        correctAnswerId: -1,
      }));
      setQuestions(formattedQuestions);
    }
  }, [state]);

  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleFlagQuestion = (questionIndex: number) => {
    const newFlags = [...flaggedQuestions];
    newFlags[questionIndex] = !newFlags[questionIndex];
    setFlaggedQuestions(newFlags);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleSelectAnswer = (questionIndex: number, answerId: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerId;
    setSelectedAnswers(newAnswers);
  };

  const [timeLeft, setTimeLeft] = useState<number | null>(null);



  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time's up!");
      return;
    }

    if (timeLeft !== null) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime as number) - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get formattedAnswers from location state
  const formattedAnswers: Answer[] = location.state?.formattedAnswers || [];

  // Update selectedAnswers when formattedAnswers or questions change
  useEffect(() => {
    console.log(formattedAnswers);
    if (formattedAnswers.length > 0 && questions.length > 0) {
      const newSelectedAnswers = questions.map((question) => {
        const matchingAnswer = formattedAnswers.find(
          (answer) => answer.questionId === question.id
        );
        return matchingAnswer ? matchingAnswer.userAnswerId[0] : null;
      });
      setSelectedAnswers(newSelectedAnswers);
    }
  }, [formattedAnswers, questions]);

  // update timeLeft from location state
  useEffect(() => {
    if (location.state?.timeLeft) {
      setTimeLeft(location.state.timeLeft);
    } else if (duration > 0) {
      setTimeLeft(duration * 60);
    }
  }, [location.state?.timeLeft, duration]);

  const navigate = useNavigate();

  const handleSubmitExam = () => {
    const formattedAnswers = questions.map((question, index) => ({
      questionId: question.id,
      userAnswerId: [selectedAnswers[index] || 0]
    }));

    navigate("/exam/" + id + "/simulation/submit", { state: { formattedAnswers, timeLeft } });
  };


  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 min-h-screen bg-gray-100">
      <div className="flex flex-col p-4 w-full xl:col-span-4 pb-32 xl:pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Time Remaining</h2>
          <div className="text-4xl font-bold text-blue-600 mt-2">
            {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
          </div>
        </div>
        {questions[currentQuestionIndex] && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            flagged={flaggedQuestions[currentQuestionIndex]}
            onFlag={() => handleFlagQuestion(currentQuestionIndex)}
            onSelectAnswer={(answerId) => handleSelectAnswer(currentQuestionIndex, answerId)}
          />
        )}
        <div className="flex items-center justify-between mt-6">
          <CustomButton
            className={`px-6 py-3 rounded-lg transition-all duration-200 ${
              currentQuestionIndex > 0 && selectedAnswers[currentQuestionIndex] !== 0
                ? "bg-gray-200 text-gray-700"
                : currentQuestionIndex > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
              }
            }}
            label="Previous Question"
            disabled={currentQuestionIndex === 0}
          />
          <CustomButton
            className={`px-6 py-3 rounded-lg transition-all duration-200 ${
              currentQuestionIndex < questions.length - 1
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              }
            }}
            label="Next Question"
            disabled={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </div>
      <div className="w-full col-span-1 xl:border-l xl:border-gray-200">
        <SimulationExamSidebar
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          timeLeft={timeLeft || 0}
          handleSubmitExam={handleSubmitExam}
        />
      </div>
    </div>
  );
};

export default SimulationExamPage;
