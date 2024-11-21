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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      await getExamDetails(id);
    };
    fetchExamDetails();
  }, [id]);
  
  useEffect(() => {
    // Skip if already initialized or no exam data
    if (isInitialized || !state?.currentExam?.listQuestions) {
      return;
    }

    setDuration(state.currentExam.duration);
    const questionCount = state.currentExam.questionCount;

    // If we have formatted answers from location state, use those questions
    if (location.state?.formattedAnswers?.length > 0) {
      const formattedAnswers = location.state.formattedAnswers;
      const allQuestions = state.currentExam.listQuestions;
      
      // Map questions in the same order as formatted answers
      const orderedQuestions = formattedAnswers.map((answer: any) => {
        const question = allQuestions.find((q: any) => q.questionId === answer.questionId);
        return {
          id: question?.questionId,
          questionText: question?.questionName,
          options: question?.answers.map((answer: any) => ({
            answerId: answer.answerId,
            answerText: answer.answerText,
          })),
          correctAnswerId: -1,
        };
      });
      
      setQuestions(orderedQuestions);
    } else {
      // For new exam, shuffle questions
      const allQuestions = state.currentExam.listQuestions;
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, questionCount);

      const formattedQuestions = selectedQuestions.map((q: any) => ({
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

    setIsInitialized(true);
  }, [state, location.state, isInitialized]);

  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleFlagQuestion = (questionIndex: number) => {
    const newFlags = [...flaggedQuestions];
    newFlags[questionIndex] = !newFlags[questionIndex];
    setFlaggedQuestions(newFlags);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>(Array(questions.length).fill([]));

  const handleSelectAnswer = (questionIndex: number, answerId: number) => {
    const newAnswers = [...selectedAnswers];
    const currentAnswers = newAnswers[questionIndex] || [];
    const answerIndex = currentAnswers.indexOf(answerId);
    
    if (answerIndex === -1) {
      // Add answer if not already selected
      newAnswers[questionIndex] = [...currentAnswers, answerId];
    } else {
      // Remove answer if already selected
      newAnswers[questionIndex] = currentAnswers.filter(id => id !== answerId);
    }
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
    if (formattedAnswers.length > 0 && questions.length > 0) {
      const newSelectedAnswers = questions.map((question) => {
        const matchingAnswer = formattedAnswers.find(
          (answer) => answer.questionId === question.id
        );
        return matchingAnswer ? matchingAnswer.userAnswerId : [];
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
    // Clear any existing state first
    navigate("/exam/" + id + "/simulation/submit", { replace: true });

    const formattedAnswers = questions.map((question, index) => ({
      questionId: question.id,
      userAnswerId: selectedAnswers[index] || []
    }));

    // Navigate with new state
    navigate("/exam/" + id + "/simulation/submit", { state: { formattedAnswers, timeLeft } });
  };

  const handleClearAnswer = (questionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = [];
    setSelectedAnswers(newAnswers);
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
            onClearAnswer={() => handleClearAnswer(currentQuestionIndex)}
          />
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <CustomButton
            className={`px-6 py-3 rounded-lg transition-all duration-200 ${
              currentQuestionIndex > 0
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
      <div className="w-full col-span-1 pr-4">
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
